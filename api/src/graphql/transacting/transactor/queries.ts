import { extendType } from 'nexus';
import { transactor } from './objects';

export const getTransactors = extendType({
  type: 'Query',
  definition: (t) => {
    t.nonNull.field('transactors', {
      type: transactor,
      list: true,
      resolve: (_, _args, context) =>
        context.db.transactor.findMany({
          where: {
            active: true,
          },
        }),
    });
  },
});
