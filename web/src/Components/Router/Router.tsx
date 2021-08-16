import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Pages } from '../../Pages';

const Router = () => {
  const routes = Pages.map((page) => (
    <Route path={page.path} component={page.Component} />
  ));

  return <BrowserRouter>{routes}</BrowserRouter>;
};

export default Router;
