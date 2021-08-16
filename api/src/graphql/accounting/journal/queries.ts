import { arg, extendType } from 'nexus';
import { startOfYear } from 'date-fns';
import { journalWithEntryIds} from './objects';
import { fields } from '../../common';

export const queryJournals = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('journalsWithEntries', {
      type: journalWithEntryIds,
      list: true,
      args: {
        startAndEndDate: arg({
          type: fields.START_AND_END_DATE,
          required: false,
        }),
      },
      resolve: (_, args, context) => {
        const gte = args.startAndEndDate?.startDate || startOfYear(new Date()).toISOString();
        const lte = args.startAndEndDate?.endDate || new Date().toISOString();

        return context.db.journal.findMany({
          where: {
            postedOn: {
              gte,
              lte,
            },
          },
        });
      },
    });
  },
});
