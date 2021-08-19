import { extendType, arg } from 'nexus';
import { schema } from '../common';
import { schema as accountingSchema } from '../accounting';

export const createSpecialAccounts = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.nonNull.field('createSpecialAccounts', {
      type: 'Int',
      resolve: async (_root, _args, context) => {
        const res = await context.db.account.createMany({
          data: context.services.accounting.account.getSpecialAccountsDetails(),
          skipDuplicates: true,
        });

        return res.count;
      },
    });
  },
});

export const createBeginningBalance = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.nonNull.field('createBeginningBalance', {
      type: accountingSchema.adjustment.objects.adjustment,
      args: {
        entries: arg({
          type: schema.entryCreateInput,
          list: true,
          nullable: false,
        }),
      },
      resolve: async (_root, args, context) => {
        const { entries } = args;

        const isBalance = context.services.util.isEntryBalance(entries);

        if (!isBalance) {
          throw Error('Not balanced');
        }

        return context.db.adjustment.create({
          data: {
            description: 'Beginning balance, one time setup.',
            journal: {
              create: {
                type: 'ADJUSTMENT',
                entries: {
                  createMany: {
                    data: entries,
                  },
                },
              },
            },
          },
          include: {
            journal: {
              include: {
                entries: true,
              },
            },
          },
        });
      },
    });
  },
});
