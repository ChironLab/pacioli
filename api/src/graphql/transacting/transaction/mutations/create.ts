import { arg, extendType, idArg, stringArg } from 'nexus';
import { JournalType } from '@prisma/client';
import { transaction, transactionType } from '../objects';
import { fields } from '../../../common';

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
        type: arg({ type: transactionType, required: true }),
      },
      resolve: (_, args, context) => {
        const { description, entries, postedOn, transactorId, type } = args;
        const isBalance = context.services.util.isEntryBalance(entries);

        if (!isBalance) {
          throw Error('Entry not balanced.');
        }

        return context.db.transaction.create({
          data: {
            description,
            type,
            transactor: {
              connect: {
                id: transactorId,
              },
            },
            journal: {
              create: {
                type: JournalType.TRANSACTION,
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
