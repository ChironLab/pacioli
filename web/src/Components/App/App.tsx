import React from "react";
import "./App.css";
import ApolloProvider from "../Apollo";
import Router from "../Router";

const App = () => {
  return (
    <ApolloProvider>
      <Router />
    </ApolloProvider>
  );
};

export default App;
