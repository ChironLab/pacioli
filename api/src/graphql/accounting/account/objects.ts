import { objectType, enumType, arg, interfaceType, unionType } from 'nexus';
import { AccountType } from '@prisma/client';
import {
  ACCOUNT_TYPE,
  ACCOUNT,
  ACCOUNT_WITH_ENTRY_IDS,
  ACCOUNT_WITH_ENTRY_DETAIL,
  ACCOUNT_WITH_NO_ENTRY,
  ACCOUNT_INTERFACE,
} from './constants';
import { accountResolveType } from './util';
import { fields } from '../../common';
import { schema } from '../journal';

export const accountType = enumType({
  name: ACCOUNT_TYPE,
  members: AccountType,
});

export const accountInterface = interfaceType({
  name: ACCOUNT_INTERFACE,
  definition: (t) => {
    t.nonNull.int('id');
    t.nonNull.string('name');
    t.nonNull.field('accountType', { type: accountType });
    t.nonNull.boolean('active');
    t.json('meta');
  },
  resolveType: accountResolveType,
});

export const accountWithNoEntry = objectType({
  name: ACCOUNT_WITH_NO_ENTRY,
  definition: (t) => {
    t.implements(accountInterface);
  },
});

export const accountWithEntryIds = objectType({
  name: ACCOUNT_WITH_ENTRY_IDS,
  definition: (t) => {
    t.implements(accountInterface);
    t.nonNull.list.id('entryIds', {
      args: {
        startAndEndDate: arg({
          type: fields.START_AND_END_DATE,
          required: false,
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

export const accountWithEntries = objectType({
  name: ACCOUNT_WITH_ENTRY_DETAIL,
  definition: (t) => {
    t.implements(accountInterface);
    t.nonNull.list.field('entries', {
      type: schema.objects.entry,
      args: {
        startAndEndDate: arg({
          type: fields.START_AND_END_DATE,
          required: false,
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

export const account = unionType({
  name: ACCOUNT,
  definition: (t) => {
    t.members(accountWithNoEntry, accountWithEntryIds, accountWithEntries);
  },
  resolveType: accountResolveType,
});
