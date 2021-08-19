import { objectType, enumType, arg, interfaceType } from 'nexus';
import { AccountType } from '@prisma/client';
import {
  ACCOUNT_TYPE,
  ACCOUNT,
  ACCOUNT_WITH_DETAIL,
  ACCOUNT_NO_DETAIL,
} from './constants';
import { fields } from '../../common';
import { schema } from '../journal';

export const accountType = enumType({
  name: ACCOUNT_TYPE,
  members: AccountType,
});

export const account = interfaceType({
  name: ACCOUNT,
  definition: (t) => {
    t.nonNull.int('id');
    t.nonNull.string('name');
    t.nonNull.field('type', { type: accountType });
    t.nonNull.boolean('active');
  },
  resolveType: (source: any) => {
    if ('entryIds' in source && 'entries' in source) {
      return ACCOUNT_WITH_DETAIL;
    }

    return ACCOUNT_NO_DETAIL;
  },
});

export const accountNoDetail = objectType({
  name: ACCOUNT_NO_DETAIL,
  definition: (t) => {
    t.implements(account);
  },
});

export const accountWithDetail = objectType({
  name: ACCOUNT_WITH_DETAIL,
  definition: (t) => {
    t.implements(account);
    t.nonNull.list.field('entries', {
      type: schema.objects.entry,
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

    t.nonNull.list.id('entryIds', {
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

        const res = await context.db.entry.findMany({
          where: {
            accountId: root.id,
            journal: {
              postedOn: {
                gte: startDate,
                lte: endDate,
              },
            },
          },
          select: {
            id: true,
          },
        });

        return res.map((entry: any) => entry.id);
      },
    });
  },
});
