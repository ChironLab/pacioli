import { arg, extendType } from 'nexus';
import { startOfYear } from 'date-fns';
import { journal } from './objects';
import { fields } from '../common';

export const queryJournals = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('getJournals', {
      type: journal,
      list: true,
      args: {
        startAndEndDate: arg({
          type: fields.START_AND_END_DATE,
          required: true,
        }),
      },
      resolve: (_, args, context) => {
        const { startAndEndDate } = args;
        const { startDate, endDate } = startAndEndDate;

        const gte = startDate || startOfYear(new Date()).toISOString();
        const lte = endDate || new Date().toISOString();

        return context.db.journal.findMany({
          where: {
            postedOn: {
              gte,
              lte,
            },
          },
          include: {
            entries: true,
          },
        });
      },
    });
  },
});
