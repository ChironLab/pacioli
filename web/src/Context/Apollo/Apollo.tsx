import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/graphql',
});

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Apollo = ({ children }: Props) => {
  return <ApolloProvider client={client}> {children} </ApolloProvider>;
};

export default Apollo;
