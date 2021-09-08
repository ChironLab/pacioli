import { arg, extendType, intArg } from 'nexus';
import { account } from './objects';
import { fields } from '../../common';

export const queryAccounts = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('accounts', {
      type: account,
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

        return context.db.account.findMany({
          where: {
            OR: [
              { active: true },
              {
                entries: {
                  some: {
                    journal: {
                      postedOn: {
                        gte: startDate,
                        lte: endDate,
                      },
                    },
                  },
                },
              },
            ],
          },
          orderBy: {
            id: 'asc',
          },
        });
      },
    });
  },
});

export const queryAccountById = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('account', {
      type: account,
      args: {
        id: intArg({ required: true }),
        startAndEndDate: arg({
          type: fields.START_AND_END_DATE,
        }),
      },
      resolve: (_root, args, context) => {
        const { startDate, endDate } = context.services.util.getStartAndEndDate(
          args.startAndEndDate?.startDate,
          args.startAndEndDate?.endDate
        );

        const { id } = args;

        return context.db.account.findUnique({
          where: {
            id,
          },
          include: {
            entries: {
              where: {
                journal: {
                  postedOn: {
                    gte: startDate,
                    lte: endDate,
                  },
                },
              },
            },
          },
        });
      },
    });
  },
});
