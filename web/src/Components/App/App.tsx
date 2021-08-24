import React from 'react';
import { CssBaseline } from '@material-ui/core';
import './App.css';
import { ApolloProvider } from '../../Context/Apollo';
import Router from './Router';

const App = () => {
  return (
    <ApolloProvider>
      <main className='root'>
        <CssBaseline />
        <Router />
      </main>
    </ApolloProvider>
  );
};

export default App;
