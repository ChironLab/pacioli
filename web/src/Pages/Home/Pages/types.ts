import type { RouteProps } from 'react-router-dom';
import type { SvgIconComponent } from '@material-ui/icons';

type NavPosition = 'top' | 'bottom' | 'none';

export type PageMetaWithNav = {
  name: string;
  icon: SvgIconComponent;
  navPosition: NavPosition;
};

export type PageMetaWithNoNav = {
  name: string;
  navPosition: 'none';
};

export type PageRoute = {
  path: string;
  exact?: boolean;
};

export type Page = {
  route: PageRoute & RouteProps;
  Component: () => JSX.Element;
  meta: PageMetaWithNav | PageMetaWithNoNav;
};
