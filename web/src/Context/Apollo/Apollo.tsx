import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Account: {
        fields: {
          entryIds: {
            read: (_entryIds, options) => {
              const entryRefs: readonly any[] | undefined = options.readField('entries')
              return entryRefs?.map(entryRef => options.readField('id', entryRef)) || []
            }
          },
          value: {
            read: (_value, options) => {
              const entryRefs: readonly any[] | undefined = options.readField('entries')
              return entryRefs?.reduce((acc, entryRef) => acc + options.readField('amount', entryRef), 0) || 0
            }
          }
        }
      }
    }
  }),
  uri: `${window.env.api}/graphql`,
});

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Apollo = ({ children }: Props) => {
  return <ApolloProvider client={client}> {children} </ApolloProvider>;
};

export default Apollo;
