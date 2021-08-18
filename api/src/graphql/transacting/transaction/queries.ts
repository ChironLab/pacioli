import { extendType, idArg } from 'nexus';
import { transaction } from './objects';

export const getTransactionById = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('getTransactionById', {
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
          include: {
            journal: {
              include: {
                entries: true,
              },
            },
          },
          rejectOnNotFound: true
        });
      },
    });
  },
});
