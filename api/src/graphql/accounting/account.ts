import { arg, extendType, stringArg, booleanArg,intArg } from 'nexus';
import {startOfYear} from 'date-fns'
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
        accountType: arg({ type: accountType, required: true }),
      },
      resolve: async (_, args, context): Promise<any> => {
        const { id, name, accountType: account_type } = args;

        await context.db.account.upsert({
          where: {
            id,
          },
          create: {
            id,
            name,
            account_type,
          },
          update: {
            name,
            account_type,
          },
        });

        return {
          id,
          name,
          accountType: account_type,
          active: true,
        };
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
      resolve: (_, args, context): Promise<any> => {
        const { id, startAndEndDate, onlyActive } = args;
        const { startDate, endDate } = startAndEndDate;

        const gte = startDate || startOfYear(new Date()).toISOString();
        const lte = endDate  || new Date().toISOString()

        return context.db.account.findMany({
          where: {
            ...id && {id},
            ...onlyActive && {active: onlyActive},
            entries: {
              every: {
                journal: {
                  posted_on: {
                    gte,
                    lte
                  },
                }
              }
            }
          },
          include: {
            entries: true
          }
        });
      },
    });
  },
});
