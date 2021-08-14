import { arg, extendType, idArg, stringArg } from 'nexus';
import { JournalType } from '@prisma/client';
import { adjustment } from './objects';
import { schema } from '../../common';

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
      },
    });
  },
});

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
        });

        if (!postedAdjustment) {
          throw Error('Cannot find posted adjustment.');
        }

        const map = entries.reduce(
          (acc: any, entry: any) => {
            const { id, ...rest } = entry;

            if (entry.id) {
              acc.ids[id] = 1;
            }

            acc.createOrUpdateEntries.push({
              create: rest,
              update: rest,
              where: {
                id: id,
              },
            });

            return acc;
          },
          { createOrUpdateEntries: [], ids: {} }
        );

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

export const deleteAdjustment = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('deleteAdjustment', {
      type: adjustment,
      args: {
        id: idArg({ required: true }),
      },
      resolve: async (_, args, context) => {
        const { id } = args;

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
        });

        await context.db.adjustment.delete({
          where: {
            id,
          },
        });

        return postedAdjustment;
      },
    });
  },
});
