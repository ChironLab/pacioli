import { extendType, idArg, arg } from 'nexus';
import { adjustment } from './objects';
import { fields } from '../../common';

export const getAdjustmentById = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('adjustmentById', {
      type: adjustment,
      args: {
        id: idArg({ required: true }),
      },
      resolve: (_root, args, context) => {
        const { id } = args;

        return context.db.adjustment.findUnique({
          where: {
            id,
          },
        });
      },
    });
  },
});

export const getAdjustments = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('adjustments', {
      type: adjustment,
      list: true,
      args: {
        startAndEndDate: arg({
          type: fields.START_AND_END_DATE,
          required: false,
        }),
      },
      resolve: (_, args, context) => {
        const { startDate, endDate } = context.services.util.getStartAndEndDate(
          args.startAndEndDate?.startDate,
          args.startAndEndDate?.endDate
        );

        return context.db.journal.findMany({
          where: {
            postedOn: {
              gte: startDate,
              lte: endDate,
            },
          },
        });
      },
    });
  },
});
