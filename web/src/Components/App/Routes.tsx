import React from 'react';
import { Route } from 'react-router-dom';
import type { Page } from '../../Pages';

type Props = {
  pages: Page[];
};

const Routes = ({ pages }: Props) => {
  const routes = pages.map((page) => <Route {...page.route} />);

  return <>{routes}</>;
};

export default Router;
