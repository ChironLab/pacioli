import { arg, extendType, stringArg, intArg } from 'nexus';
import { account, accountType } from './objects';

export const createOrUpdateAccount = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createOrUpdateAccount', {
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
            type,
          },
          update: {
            name,
            type,
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
