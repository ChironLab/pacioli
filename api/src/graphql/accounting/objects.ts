import { objectType, enumType } from 'nexus';
import { AccountType, JournalType } from '@prisma/client';
import {
  ACCOUNT_TYPE,
  ACCOUNT,
  JOURNAL_TYPE,
  JOURNAL,
  ENTRY,
  ADJUSTMENT,
} from './constants';

export const accountType = enumType({
  name: ACCOUNT_TYPE,
  members: AccountType,
});

export const entry = objectType({
  name: ENTRY,
  definition: (t) => {
    t.string('id');
    t.string('journalId');
    t.int('accountId');
    t.float('amount');
  },
});

export const account = objectType({
  name: ACCOUNT,
  definition: (t) => {
    t.nonNull.int('id');
    t.nonNull.string('name');
    t.nonNull.field('accountType', { type: accountType });
    t.nonNull.boolean('active');
    t.list.field('entries', {
      type: entry,
      resolve: (root, _args, context) => {
        return context.db.entry.findMany({
          where: {
            accountId: root.id,
          },
        });
      },
    });
  },
});

export const journalType = enumType({
  name: JOURNAL_TYPE,
  members: JournalType,
});

export const journal = objectType({
  name: JOURNAL,
  definition: (t) => {
    t.nonNull.string('id');
    t.nonNull.boolean('locked');
    t.date('createdAt');
    t.date('updatedAt');
    t.date('postedOn');
    t.field('journalType', { type: journalType });
    t.nonNull.list.field('entries', {
      type: entry,
      resolve: async (root, _args, context) => {
        return context.db.entry.findMany({
          where: {
            journalId: root.id,
          },
        });
      },
    });
    t.field('journalType', { type: journalType });
  },
});

export const adjustment = objectType({
  name: ADJUSTMENT,
  definition: (t) => {
    t.nonNull.string('id');
    t.nonNull.field('journal', {
      type: journal,
      resolve: (root, _args, context) => {
        return context.db.journal.findFirst({
          where: {
            adjustment: {
              id: root.id,
            },
          },
          rejectOnNotFound: true,
        });
      },
    });
    t.string('description');
  },
});
