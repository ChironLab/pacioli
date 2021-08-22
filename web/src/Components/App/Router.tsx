import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Pages } from '../../Pages';

const Router = () => {
  return (
    <BrowserRouter>
      {Pages.map((page) => (
        <Route {...page.route} key={`Route_${page.meta.name}`} />
      ))}
    </BrowserRouter>
  );
};

export default Router;
