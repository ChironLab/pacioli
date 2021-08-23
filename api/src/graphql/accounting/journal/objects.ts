import { objectType, enumType } from 'nexus';
import { JournalType } from '@prisma/client';
import { JOURNAL_TYPE, JOURNAL, ENTRY } from './constants';

export const entry = objectType({
  name: ENTRY,
  definition: (t) => {
    t.nonNull.id('id');
    t.nonNull.id('journalId');
    t.nonNull.int('accountId');
    t.nonNull.float('amount');
  },
});

export const journalType = enumType({
  name: JOURNAL_TYPE,
  members: JournalType,
});

export const journal = objectType({
  name: JOURNAL,
  definition: (t) => {
    t.nonNull.id('id');
    t.nonNull.boolean('locked');
    t.nonNull.date('createdAt');
    t.nonNull.date('updatedAt');
    t.nonNull.date('postedOn');
    t.nonNull.field('type', { type: journalType });
    t.nonNull.list.field('entries', {
      type: entry,
      resolve: (root, _args, context) =>
        context.db.entry.findMany({
          where: {
            journalId: root.id,
          },
        }),
    });
  },
});
