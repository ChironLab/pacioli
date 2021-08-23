import { objectType, enumType, arg } from 'nexus';
import { AccountType } from '@prisma/client';
import { ACCOUNT_TYPE, ACCOUNT } from './constants';
import { fields } from '../../common';
import { schema } from '../journal';

export const accountType = enumType({
  name: ACCOUNT_TYPE,
  description: 'Type of the account, e.g. asset, liabilities.',
  members: AccountType,
});

export const account = objectType({
  name: ACCOUNT,
  description: 'A single account, e.g. 1000 - Cash on hand. ',
  definition: (t) => {
    t.nonNull.int('id', {description: 'Account id, range from 1000 - 9999'});
    t.nonNull.string('name', {description: 'Name of the account, e.g. cash'});
    t.nonNull.field('type', { type: accountType, description: 'Type of the account, e.g. asset, liabilities.'});
    t.nonNull.boolean('active', {description: 'Actively being used.'});
    t.nonNull.list.field('entries', {
      type: schema.objects.entry,
      description: 'Related entries that make up the value.',
      args: {
        startAndEndDate: arg({
          type: fields.START_AND_END_DATE,
        }),
      },
      resolve: async (root, args, context) => {
        const { startAndEndDate } = args;

        const { startDate, endDate } = context.services.util.getStartAndEndDate(
          startAndEndDate?.startDate,
          startAndEndDate?.endDate
        );

        return context.db.entry.findMany({
          where: {
            accountId: root.id,
            journal: {
              postedOn: {
                gte: startDate,
                lte: endDate,
              },
            },
          },
        });
      },
    });
  },
});
