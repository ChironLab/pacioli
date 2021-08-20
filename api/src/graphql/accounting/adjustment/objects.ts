import { objectType } from 'nexus';
import { ADJUSTMENT } from './constants';
import { schema } from '../journal';

export const adjustment = objectType({
  name: ADJUSTMENT,
  definition: (t) => {
    t.nonNull.id('id');
    t.string('description');
    t.nonNull.field('journal', {
      type: schema.objects.journal,
      resolve: (root, _args, context) =>
        context.db.journal.findUnique({
          where: {
            id: root.id,
          },
          include: {
            entries: true,
          },
          rejectOnNotFound: true,
        }),
    });
  },
});
