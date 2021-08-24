import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Apollo = ({ children }: Props) => {
  return <ApolloProvider client={client}> {children} </ApolloProvider>;
};

export default Apollo;
