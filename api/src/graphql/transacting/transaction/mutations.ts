import { arg, extendType, idArg, stringArg } from 'nexus';
import { JournalType } from '@prisma/client';
import { transaction, transactionType } from './objects';
import { fields } from '../../common';

export const createTransaction = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createTransaction', {
      type: transaction,
      args: {
        postedOn: arg({ type: 'DateTime', required: false }),
        description: stringArg({ required: true }),
        entries: arg({
          type: fields.ENTRY_CREATE_INPUT,
          list: true,
          required: true,
        }),
        transactorId: idArg({ required: true }),
        transactionType: arg({ type: transactionType, required: true }),
      },
      resolve: (_, args, context) => {
        const {
          description,
          entries,
          postedOn,
          transactorId,
          transactionType,
        } = args;
        const isBalance = context.services.util.isEntryBalance(entries);

        if (!isBalance) {
          throw Error('Entry not balanced.');
        }

        return context.db.transaction.create({
          data: {
            description,
            transactionType,
            transactor: {
              connect: {
                id: transactorId,
              },
            },
            journal: {
              create: {
                journalType: JournalType.TRANSACTION,
                ...(postedOn && { postedOn }),
              },
            },
          },
          include: {
            journal: {
              include: {
                entries: true,
              },
            },
          },
        });
      },
    });
  },
});

export const deleteTransaction = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('deleteTransaction', {
      type: transaction,
      args: {
        id: idArg({ required: true }),
      },
      resolve: async (_, args, context) => {
        const { id } = args;

        const postedTransaction = await context.db.transaction.findUnique({
          where: {
            id,
          },
          include: {
            journal: {
              include: {
                entries: true,
              },
            },
          },
        });

        await context.db.transaction.delete({
          where: {
            id,
          },
        });

        return postedTransaction;
      },
    });
  },
});

export const updateTransaction = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('updateTransaction', {
      type: transaction,
      args: {
        id: idArg({ required: true }),
        postedOn: arg({ type: 'DateTime', required: false }),
        description: stringArg({ required: true }),
        entries: arg({
          type: fields.ENTRY_UPDATE_INPUT,
          list: true,
          required: true,
        }),
        transactorId: idArg({ required: true }),
        transactionType: arg({ type: transactionType, required: true }),
      },
      resolve: async (_, args, context) => {
        const {
          id,
          description,
          entries,
          postedOn,
          transactorId,
          transactionType,
        } = args;
        const isBalance = context.services.util.isEntryBalance(entries);

        if (!isBalance) {
          throw Error('Entry not balanced.');
        }

        const postedTransaction = await context.db.transaction.findUnique({
          where: {
            id,
          },
          include: {
            transactor: true,
            journal: {
              include: {
                entries: true,
              },
            },
          },
        });

        if (!postedTransaction) {
          throw Error('Cannot find posted adjustment.');
        }

        const map = entries.reduce(
          (acc: any, entry: any) => {
            const { id, ...rest } = entry;

            if (entry.id) {
              acc.ids[id] = 1;
            }

            acc.createOrUpdateEntries.push({
              create: rest,
              update: rest,
              where: {
                id: id,
              },
            });

            return acc;
          },
          { createOrUpdateEntries: [], ids: {} }
        );

        const deleteEntries = postedTransaction.journal.entries
          .filter((entry) => !map.ids[entry.id])
          .map((entry) => entry.id);

        return context.db.transaction.update({
          where: {
            id,
          },
          data: {
            description,
            transactionType,
            transactor: {
              connect: {
                id: transactorId,
              },
            },
            journal: {
              update: {
                postedOn,
                entries: {
                  upsert: map.createOrUpdateEntries,
                  deleteMany: {
                    id: {
                      in: deleteEntries,
                    },
                  },
                },
              },
            },
          },
          include: {
            journal: {
              include: {
                entries: true,
              },
            },
          },
        });
      },
    });
  },
});
