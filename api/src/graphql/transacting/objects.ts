import { objectType, enumType } from 'nexus';
import { TransactorType, TransactionType } from '@prisma/client';
import {
  TRANSACTOR_TYPE,
  TRANSACTION_TYPE,
  TRANSACTOR,
  TRANSACTION,
} from './constants';
import { fields } from '../accounting';

export const transactorType = enumType({
  name: TRANSACTOR_TYPE,
  members: TransactorType,
});

export const transactionType = enumType({
  name: TRANSACTION_TYPE,
  members: TransactionType,
});

export const transaction = objectType({
  name: TRANSACTION,
  definition: (t) => {
    t.nonNull.id('id');
    t.nonNull.field('type', { type: transactionType });
    t.nonNull.field('journal', {
      type: fields.JOURNAL,
      resolve: (root, _args, context) => {
        return context.db.journal.findFirst({
          where: {
            transaction: {
              id: root.id,
            },
          },
          rejectOnNotFound: true,
        });
      },
    });
    t.string('description');
    t.json('meta');
  },
});

export const transactor = objectType({
  name: TRANSACTOR,
  definition: (t) => {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.boolean('active');
    t.nonNull.field('type', { type: transactorType });
    t.list.field('transactions', {
      type: transaction,
      resolve: (root, _args, context) => {
        return context.db.transaction.findMany({
          where: {
            transactor: {
              id: root.id,
            },
          },
        });
      },
    });

    t.string('description');
    t.json('meta');
  },
});
