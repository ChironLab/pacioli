import { objectType, enumType, interfaceType, unionType } from 'nexus';
import { JournalType } from '@prisma/client';
import {
  JOURNAL_WITH_ENTRIES,
  JOURNAL_WITH_NO_ENTRY,
  JOURNAL_WITH_ENTRY_IDS,
  JOURNAL_INTERFACE,
  JOURNAL_TYPE,
  JOURNAL,
  ENTRY,
} from './constants';
import { journalResolveType } from './util';

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

export const journalInterface = interfaceType({
  name: JOURNAL_INTERFACE,
  definition: (t) => {
    t.nonNull.id('id');
    t.nonNull.boolean('locked');
    t.nonNull.date('createdAt');
    t.nonNull.date('updatedAt');
    t.nonNull.date('postedOn');
    t.nonNull.field('journalType', { type: journalType });
  },
  resolveType: journalResolveType,
});

export const journalWithEntries = objectType({
  name: JOURNAL_WITH_ENTRIES,
  definition: (t) => {
    t.implements(journalInterface);
    t.nonNull.list.field('entries', {
      type: entry,
      resolve: (root, _args, context) => {
        return context.db.entry.findMany({
          where: {
            journalId: root.id,
          },
        });
      },
    });
  },
});

export const journalWithEntryIds = objectType({
  name: JOURNAL_WITH_ENTRY_IDS,
  definition: (t) => {
    t.implements(journalInterface);
    t.nonNull.list.id('entryIds', {
      resolve: async (root, _args, context) => {
        const res = await context.db.entry.findMany({
          where: {
            journalId: root.id,
          },
          select: {
            id: true,
          },
        });

        return res.map((entry) => entry.id);
      },
    });
  },
});

export const journalWithNoEntry = objectType({
  name: JOURNAL_WITH_NO_ENTRY,
  definition: (t) => {
    t.implements(journalInterface);
  },
});

export const journal = unionType({
  name: JOURNAL,
  definition: (t) => {
    t.members(journalWithEntries, journalWithNoEntry, journalWithEntryIds);
  },
  resolveType: journalResolveType,
});