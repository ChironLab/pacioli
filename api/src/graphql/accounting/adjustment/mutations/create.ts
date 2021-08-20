import { arg, extendType } from 'nexus';
import { JournalType } from '@prisma/client';
import { adjustment } from '../objects';
import { schema } from '../../../common';

export const createAdjustment = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createAdjustment', {
      type: adjustment,
      args: {
        postedOn: arg({ type: 'DateTime', required: false }),
        description: arg({ type: 'String', required: true }),
        entries: arg({
          type: schema.entryCreateInput,
          list: true,
          required: true,
        }),
      },
      resolve: (_, args, context) => {
        const { description, entries, postedOn } = args;
        const isBalance = context.services.util.isEntryBalance(entries);

        if (!isBalance) {
          throw Error('Entry not balanced.');
        }

        return context.db.adjustment.create({
          data: {
            description,
            journal: {
              create: {
                ...(postedOn && { posted_on: postedOn }),
                type: JournalType.ADJUSTMENT,
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
      },
    });
  },
});
