import React from 'react';
import { CssBaseline } from '@material-ui/core';
import './App.css';
import { ApolloProvider } from '../../Context/Apollo';
import { UiProvider } from '../../Context/UiContext';
import Router from './Router';

const App = () => {
  return (
    <ApolloProvider>
      <UiProvider>
        <main className='root'>
          <CssBaseline />
          <Router />
        </main>
      </UiProvider>
    </ApolloProvider>
  );
};

export default App;
