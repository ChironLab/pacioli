import type { RouteProps } from 'react-router-dom';

export type PageMeta = {
  name: string;
};

export type PageRoute = {
  path: string;
  exact?: boolean;
};

export type Page = {
  route: PageRoute & RouteProps;
  meta: PageMeta;
};
