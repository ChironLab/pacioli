import { stringArg, extendType, arg, idArg } from 'nexus';
import { transactor, transactorType } from './objects';

export const createOrUpdateTransactor = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createOrUpdateTransactor', {
      type: transactor,
      args: {
        id: idArg(),
        name: stringArg({ required: true }),
        type: arg({ type: transactorType, required: true }),
        meta: arg({ type: 'JSON' }),
      },
      resolve: (_, args, context) => {
        const { name, type, meta, id: maybeId } = args;

        const id = maybeId || undefined;

        return context.db.transactor.upsert({
          where: { id },
          create: {
            name,
            type,
            ...(meta && { meta }),
          },
          update: {
            name,
            type,
            ...(meta && { meta }),
          },
        });
      },
    });
  },
});

export const deleteTransactor = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('deleteTransactor', {
      type: transactor,
      args: {
        id: idArg({ required: true }),
      },
      resolve: (_, args, context) => {
        const { id } = args;

        return context.db.transactor.update({
          where: {
            id,
          },
          data: {
            active: false,
          },
        });
      },
    });
  },
});
