import { arg, extendType, stringArg, booleanArg, intArg } from 'nexus';
import { startOfYear } from 'date-fns';
import { account, accountType } from './objects';
import { fields } from '../common';

export const createAccount = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createAccount', {
      type: account,
      args: {
        id: intArg({ required: true }),
        name: stringArg({ required: true }),
        type: arg({ type: accountType, required: true }),
      },
      resolve: (_, args, context) => {
        const { id, name, type } = args;

        return context.db.account.upsert({
          where: {
            id,
          },
          create: {
            id,
            name,
            accountType: type,
          },
          update: {
            name,
            accountType: type,
          },
        });
      },
    });
  },
});

export const deleteAccount = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('deleteAccount', {
      type: 'String',
      args: {
        id: arg({ type: 'Int', required: true }),
      },
      resolve: async (_, args, context): Promise<string> => {
        const { id } = args;

        await context.db.account.update({
          where: {
            id,
          },
          data: {
            active: false,
          },
        });

        return 'OK';
      },
    });
  },
});

export const queryAccounts = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('getAccounts', {
      type: account,
      list: true,
      args: {
        id: intArg(),
        onlyActive: booleanArg({ default: true }),
        startAndEndDate: arg({
          type: fields.START_AND_END_DATE,
          required: true,
        }),
      },
      resolve: (_, args, context) => {
        const { id, startAndEndDate, onlyActive } = args;
        const { startDate, endDate } = startAndEndDate;

        const gte = startDate || startOfYear(new Date()).toISOString();
        const lte = endDate || new Date().toISOString();

        return context.db.account.findMany({
          where: {
            ...(id && { id }),
            ...(onlyActive && { active: onlyActive }),
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
      },
    });
  },
});
