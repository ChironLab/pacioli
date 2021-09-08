import { objectType, enumType } from 'nexus';
import { JournalType } from '@prisma/client';
import {schema} from '../account'
import {schema as transactingSchema} from '../../transacting'
import {schema as adjustmentSchema} from '../adjustment'
import { JOURNAL_TYPE, JOURNAL, ENTRY } from './constants';

export const entry = objectType({
  name: ENTRY,
  definition: (t) => {
    t.nonNull.id('id');
    t.nonNull.id('journalId');
    t.nonNull.int('accountId');
    t.nonNull.float('amount');
    t.nonNull.field('journal', {type: JOURNAL, resolve: (root, _args, context) => context.db.journal.findUnique({
        where: {
          id: root.journalId
        },
        rejectOnNotFound: true
      })
    })
    t.nonNull.field('account', {type: schema.objects.account, resolve: (root, _args, context) => context.db.account.findUnique({
        where: {
          id: root.accountId
        },
        rejectOnNotFound: true
      })
    })
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
    t.field('transaction', {
      type: transactingSchema.transactionSchema.schema.objects.transaction,
      resolve: (root, _args, context) => context.db.transaction.findFirst({
        where: {
          journalId: root.id
        }
      })
    })
    t.field('adjustment', {
      type: adjustmentSchema.objects.adjustment,
      resolve: (root, _args, context) => context.db.adjustment.findFirst({
        where: {
          journalId: root.id
        }
      })
    })

  },
});
