import React from 'react';
import './App.css';
import { ApolloProvider } from '../../Context/Apollo';
import { UiProvider } from '../../Context/UiContext';
import MainContainer from './MainContainer';

const App = () => {
  return (
    <ApolloProvider>
      <UiProvider>
        <MainContainer />
      </UiProvider>
    </ApolloProvider>
  );
};

export default App;
