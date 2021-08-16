import { extendType } from 'nexus';
import { transactor } from './objects';

export const getTransactorsWithTransactions = extendType({
  type: 'Query',
  definition: (t) => {
    t.nonNull.field('getTransactorsWithTransactions', {
      type: transactor,
      list: true,
      resolve: (_, _args, context) => {
        return context.db.transactor.findMany({
          where: {
            active: true,
          },
          include: {
            transaction: true,
          },
        });
      },
    });
  },
});
