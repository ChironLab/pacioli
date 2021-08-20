import { extendType, idArg } from 'nexus';
import { transaction } from '../objects';

export const deleteTransaction = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('deleteTransaction', {
      type: transaction,
      args: {
        id: idArg({ required: true }),
      },
      resolve: async (_, args, context) => {
        const { id } = args;

        const postedTransaction = await context.db.transaction.findUnique({
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

        await context.db.transaction.delete({
          where: {
            id,
          },
        });

        return postedTransaction;
      },
    });
  },
});
