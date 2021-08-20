import { arg, extendType, idArg, stringArg } from 'nexus';
import { adjustment } from '../objects';
import { schema } from '../../../common';

export const updateAdjustment = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('updateAdjustment', {
      type: adjustment,
      args: {
        id: idArg({ required: true }),
        postedOn: arg({ type: 'DateTime', required: false }),
        description: stringArg({ required: true }),
        entries: arg({
          type: schema.entryUpdateInput,
          list: true,
          required: true,
        }),
      },
      resolve: async (_, args, context) => {
        const { id, description, entries, postedOn } = args;
        const isBalance = context.services.util.isEntryBalance(entries);

        if (!isBalance) {
          throw Error('Entry not balanced.');
        }

        const postedAdjustment = await context.db.adjustment.findUnique({
          where: {
            id,
          },
          include: {
            journal: {
              include: {
                entries: true,
              },
            },
          },
          rejectOnNotFound: true,
        });

        const map = entries.reduce(context.services.util.inputEntriesReducer, {
          createOrUpdateEntries: [],
          ids: {},
        });

        const deleteEntries = postedAdjustment.journal.entries
          .filter((entry) => !map.ids[entry.id])
          .map((entry) => entry.id);

        return context.db.adjustment.update({
          where: {
            id,
          },
          data: {
            description,
            journal: {
              update: {
                postedOn,
                entries: {
                  upsert: map.createOrUpdateEntries,
                  deleteMany: {
                    id: {
                      in: deleteEntries,
                    },
                  },
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
