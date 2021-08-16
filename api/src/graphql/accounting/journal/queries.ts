import { arg, extendType } from 'nexus';
import { journal } from './objects';
import { fields } from '../../common';

export const queryJournals = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('journals', {
      type: journal,
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
