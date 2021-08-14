import { arg, extendType } from 'nexus';
import { startOfYear } from 'date-fns';
import { account } from './objects';
import { fields } from '../../common';

export const queryAccounts = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('getAccounts', {
      type: account,
      list: true,
      args: {
        startAndEndDate: arg({
          type: fields.START_AND_END_DATE,
          required: false,
        }),
      },
      resolve: async (_root, args, context) => {

        const gte = args.startAndEndDate?.startDate || startOfYear(new Date()).toISOString();
        const lte = args.startAndEndDate?.endDate || new Date().toISOString();

        const res = await context.db.account.findMany({
          where: {
            entries: {
              every: {
                journal: {
                  postedOn: {
                    gte,
                    lte,
                  },
                },
              },
            },
          },
          include: {
            entries: true,
          },
        });

        return res
      },
    });
  },
});
