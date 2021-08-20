import React from 'react';
import { CssBaseline } from '@material-ui/core';
import './App.css';
import { ApolloProvider } from '../../Context/Apollo';
import { UiProvider } from '../../Context/UiContext';
import Router from './Router';
import { useStyles } from './styles';

const App = () => {
  const classes = useStyles();
  return (
    <ApolloProvider>
      <UiProvider>
        <main className={classes.root}>
          <CssBaseline />
          <Router />
        </main>
      </UiProvider>
    </ApolloProvider>
  );
};

export default App;
