import { arg, extendType } from 'nexus';
import { JournalType } from '@prisma/client';
import { adjustment } from './objects';
import { fields } from '../common';

export const postAdjustment = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('postAdjustment', {
      type: adjustment,
      args: {
        postedOn: arg({ type: 'DateTime', required: false }),
        description: arg({ type: 'String', required: true }),
        entries: arg({ type: fields.ENTRY_INPUT, list: true, required: true }),
      },
      resolve: async (_, args, context): Promise<any> => {
        const { description, entries, postedOn } = args;
        const isBalance = context.services.util.isEntryBalance(entries);

        if (!isBalance) {
          throw Error('Entry not balanced.');
        }

        const res = await context.db.adjustment.create({
          data: {
            description,
            journal: {
              create: {
                ...(postedOn && { posted_on: postedOn }),
                journalType: JournalType.ADJUSTMENT,
                entries: {
                  create: entries,
                },
              },
            },
          },
          include: {
            journal: {
              include: {
                entries: true,
              },
            },
          },
        });

        return res;
      },
    });
  },
});
