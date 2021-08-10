import { extendType } from 'nexus';
import { starterAccounts } from './util';

export const firstTimeSetup = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.nonNull.field('firstTimeSetup', {
      type: 'Int',
      resolve: async (_root, _args, context) => {
        const res = await context.db.account.createMany({
          data: starterAccounts,
          skipDuplicates: true,
        });

        return res.count;
      },
    });
  },
});
