import { objectType, enumType, arg } from 'nexus';
import { TransactorType } from '@prisma/client';
import { TRANSACTOR_TYPE, TRANSACTOR } from './constants';
import { schema } from '../transaction';
import { fields } from '../../common';

export const transactorType = enumType({
  name: TRANSACTOR_TYPE,
  members: TransactorType,
});

export const transactor = objectType({
  name: TRANSACTOR,
  definition: (t) => {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.field('type', { type: transactorType });
    t.nonNull.boolean('active');
    t.json('meta');
    t.nonNull.field('transactions', {
      type: schema.objects.transaction,
      list: true,
      args: {
        startAndEndDate: arg({
          type: fields.START_AND_END_DATE,
        }),
      },
      resolve: (root, args, context) => {
        const { startDate, endDate } = context.services.util.getStartAndEndDate(
          args.startAndEndDate?.startDate,
          args.startAndEndDate?.endDate
        );

        return context.db.transaction.findMany({
          where: {
            transactorId: root.id,
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
