import { objectType, enumType } from 'nexus';
import { TransactionType } from '@prisma/client';
import {
  TRANSACTION_TYPE,
  TRANSACTION,
} from './constants';
import { schema } from '../../accounting';

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
      type: schema.journal.objects.journal,
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
