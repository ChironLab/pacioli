import { arg, extendType } from 'nexus';
import { accountWithDetail, accountNoDetail } from './objects';
import { fields } from '../../common';

export const queryAccountWithEntryIds = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('accountsWithDetail', {
      type: accountWithDetail,
      args: {
        startAndEndDate: arg({
          type: fields.START_AND_END_DATE,
        }),
      },
      resolve: async (_root, args, context) => {
        const { startDate, endDate } = context.services.util.getStartAndEndDate(
          args.startAndEndDate?.startDate,
          args.startAndEndDate?.endDate
        );

        const res = await context.db.account.findMany({
          where: {
            entries: {
              every: {
                journal: {
                  postedOn: {
                    gte: startDate,
                    lte: endDate,
                  },
                },
              },
            },
          },
          include: {
            entries: true,
          },
        });

        return res.map((account: any) => {
          const entryIds = account.entries.map((entry: any) => entry.id);
          return { ...account, entryIds };
        });
      },
    });
  },
});

export const queryAccounts = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('accountsWithNoDetail', {
      type: accountNoDetail,
      resolve: (_root, _args, context) => {
        return context.db.account.findMany({
          select: {
            id: true,
            name: true,
            active: true,
            type: true,
          },
        });
      },
    });
  },
});
