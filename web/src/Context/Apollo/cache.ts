import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Journal: {
      fields: {
        postedOn: {
          read: (postedOn, _options) => {
            return new Date(postedOn);
          },
        },
        createdAt: {
          read: (createdAt, _options) => {
            return new Date(createdAt);
          },
        },
      },
    },
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
    Transaction: {
      fields: {
        meta: {
          read: (meta, _options) => {
            return JSON.parse(meta)
          }
        }
      }
    }
  },
});
