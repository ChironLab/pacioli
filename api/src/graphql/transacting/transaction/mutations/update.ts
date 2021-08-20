import { arg, extendType, idArg, stringArg } from 'nexus';
import { transaction, transactionType } from '../objects';
import { fields } from '../../../common';

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
        type: arg({ type: transactionType, required: true }),
      },
      resolve: async (_, args, context) => {
        const { id, description, entries, postedOn, transactorId, type } = args;
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

        const map = entries.reduce(context.services.util.inputEntriesReducer, {
          createOrUpdateEntries: [],
          ids: {},
        });

        const deleteEntries = postedTransaction.journal.entries
          .filter((entry) => !map.ids[entry.id])
          .map((entry) => entry.id);

        return context.db.transaction.update({
          where: {
            id,
          },
          data: {
            description,
            type,
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
