import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Account: {
      fields: {
        entryIds: {
          read: (_entryIds, options) => {
            const entryRefs: readonly any[] | undefined =
              options.readField('entries');
            return (
              entryRefs?.map((entryRef) => options.readField('id', entryRef)) ||
              []
            );
          },
        },
        value: {
          read: (_value, options) => {
            const entryRefs: readonly any[] | undefined =
              options.readField('entries');
            return (
              entryRefs?.reduce(
                (acc, entryRef) => acc + options.readField('amount', entryRef),
                0
              ) || 0
            );
          },
        },
      },
    },
  },
});
