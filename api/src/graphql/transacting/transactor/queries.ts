import { stringArg, extendType, arg, idArg } from 'nexus';
import { transactor, transactorType } from './objects';

export const queryTransactors = extendType({
  type: 'Query',
  definition: (t) => {
    t.nonNull.field('getTransactors', {
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
