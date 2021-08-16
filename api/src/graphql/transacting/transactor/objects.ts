import { objectType, enumType, interfaceType } from 'nexus';
import { TransactorType } from '@prisma/client';
import {
  TRANSACTOR_TYPE,
  TRANSACTOR,
  TRANSACTOR_WITH_DETAIL,
  TRANSACTOR_WITH_NO_DETAIL,
} from './constants';
import { schema } from '../transaction';

export const transactorType = enumType({
  name: TRANSACTOR_TYPE,
  members: TransactorType,
});

export const transactor = interfaceType({
  name: TRANSACTOR,
  definition: (t) => {
    t.nonNull.id('id');
    t.nonNull.field('type', { type: transactorType });
    t.nonNull.boolean('active');
    t.json('meta');
  },
  resolveType: (source) => {
    if ('transactions' in source) {
      return TRANSACTOR_WITH_DETAIL;
    }

    return TRANSACTOR_WITH_NO_DETAIL;
  },
});

export const transactorWithNoDetail = objectType({
  name: TRANSACTOR_WITH_NO_DETAIL,
  definition: (t) => {
    t.implements(transactor);
  },
});

export const transactorWithDetail = objectType({
  name: TRANSACTOR_WITH_DETAIL,
  definition: (t) => {
    t.implements(transactor);
    t.nonNull.field('transactions', {
      type: schema.objects.transaction,
      list: true,
      resolve: (root, _args, context) => {
        return context.db.transaction.findMany({
          where: {
            transactorId: root.id,
          },
        });
      },
    });
  },
});
