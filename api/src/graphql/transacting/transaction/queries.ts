import { extendType, idArg, arg } from 'nexus';
import { transaction } from './objects';
import { fields } from '../../common';

export const getTransactionById = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('transactionById', {
      type: transaction,
      args: {
        id: idArg({ required: true }),
      },
      resolve: (_root, args, context) => {
        const { id } = args;

        return context.db.transaction.findUnique({
          where: {
            id,
          },
          rejectOnNotFound: true,
        });
      },
    });
  },
});

export const getTransactions = extendType({
  type: 'Query',
  definition: (t) => {
    t.nonNull.list.field('transactions', {
      type: transaction,
      args: {
        startAndEndDate: arg({
          type: fields.START_AND_END_DATE,
        }),
      },
      resolve: (_root, args, context) => {
        const { startDate, endDate } = context.services.util.getStartAndEndDate(
          args.startAndEndDate?.startDate,
          args.startAndEndDate?.endDate
        );

        return context.db.transaction.findMany({
          where: {
            journal: {
              postedOn: {
                gte: startDate,
                lte: endDate,
              },
            },
          },
        });
      },
    });
  },
});
