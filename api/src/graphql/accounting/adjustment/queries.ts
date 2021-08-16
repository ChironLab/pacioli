import { queryType, idArg } from 'nexus';
import {adjustment} from './objects'

export const getAdjustmentById = queryType({
  definition: (t) => {
    t.field('adjustmentById', {
      type: adjustment,
      args: {
        id: idArg({required: true})
      },
      resolve: (_root, args, context) => {
        const {id} = args;

        return context.db.adjustment.findUnique({
          where: {
            id,
          }
        })
      }
    })
  }
})

export const queryAdjustments = extendType({
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
