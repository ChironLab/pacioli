import { objectType } from 'nexus';
import { ADJUSTMENT } from './constants';
import { schema } from '../journal';

export const adjustment = objectType({
  name: ADJUSTMENT,
  description: 'Adjustments are manually posted to affect the trial balance.',
  definition: (t) => {
    t.nonNull.id('id', {description: 'Auto generated adjustment id using uuid.'});
    t.string('description');
    t.nonNull.field('journal', {
      type: schema.objects.journal,
      resolve: (root, _args, context) =>
        context.db.journal.findUnique({
          where: {
            id: root.id,
          },
          rejectOnNotFound: true,
        }),
    });
  },
});
