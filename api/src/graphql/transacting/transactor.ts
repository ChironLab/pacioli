import { stringArg, extendType, arg, idArg } from 'nexus';
import { transactor, transactorType } from './objects';

export const createTransactor = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createTransactor', {
      type: transactor,
      args: {
        name: stringArg({ required: true }),
        type: arg({ type: transactorType, required: true }),
        meta: arg({ type: 'Json' }),
      },
      resolve: (_, args, context) => {
        const { name, type, meta } = args;

        return context.db.transactor.create({
          data: {
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

export const updateTransactor = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('updateTransactor', {
      type: transactor,
      args: {
        id: idArg({ required: true }),
        name: stringArg(),
        type: arg({ type: transactorType }),
        meta: arg({ type: 'Json' }),
      },
      resolve: (_, args, context) => {
        const { id, name, type, meta } = args;

        return context.db.transactor.update({
          where: {
            id,
          },
          data: {
            ...(name && { name }),
            ...(type && { type }),
            ...(type && { meta }),
          },
        });
      },
    });
  },
});
