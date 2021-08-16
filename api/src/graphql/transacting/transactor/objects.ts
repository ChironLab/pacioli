import { objectType, enumType } from 'nexus';
import { TransactorType } from '@prisma/client';
import {
  TRANSACTOR_TYPE,
  TRANSACTOR,
} from './constants';
import { schema } from '../transaction';

export const transactorType = enumType({
  name: TRANSACTOR_TYPE,
  members: TransactorType,
});

export const transactor = objectType({
  name: TRANSACTOR,
  definition: (t) => {
    t.nonNull.id('id');
    t.nonNull.field('type', { type: transactorType });
    t.nonNull.field('transactions', {
      type: schema.objects.transaction,
      list: true,
      resolve: (root, _args, context) => {
        return context.db.transaction.findMany({
          where: {
            transactorId: root.id
          },
        });
      },
    });
    t.nonNull.boolean('active');
    t.json('meta');
  },
});
