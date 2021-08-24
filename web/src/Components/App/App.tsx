import React from 'react';
import './App.css';
import { ApolloProvider } from '../../Context/Apollo';
import { ThemeProvider } from '../../Context/CustomTheme';
import Router from './Router';

const App = () => {
  return (
    <ApolloProvider>
      <ThemeProvider>
        <main className='root'>
          <Router />
        </main>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
