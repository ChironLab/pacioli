import { extendType, idArg } from 'nexus';
import { adjustment } from '../objects';

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
