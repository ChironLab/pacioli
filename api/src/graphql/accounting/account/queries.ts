import { arg, extendType } from 'nexus';
import { accountWithDetail, accountNoDetail } from './objects';
import { fields } from '../../common';

export const queryAccountWithEntryIds = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('accountsWithEntryIds', {
      type: accountWithDetail,
      list: true,
      args: {
        startAndEndDate: arg({
          type: fields.START_AND_END_DATE,
          required: false,
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

        return res.map((account) => {
          const entryIds = account.entries.map((entry) => entry.id);
          return { ...account, entryIds };
        });
      },
    });
  },
});

export const queryAccounts = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('accountsWithNoDetail', {
      type: accountNoDetail,
      list: true,
      resolve: (_root, _args, context) => {
        return context.db.account.findMany({
          select: {
            id: true,
            name: true,
            active: true,
            accountType: true,
          },
        });
      },
    });
  },
});
