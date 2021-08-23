import type { RouteProps } from 'react-router-dom';
import type { SvgIconComponent } from '@material-ui/icons';

type NavPosition = 'top' | 'bottom' | 'none';

export type PageMeta = {
  name: string;
  icon: SvgIconComponent;
  navPosition: NavPosition;
};

export type PageRoute = {
  path: string;
  exact?: boolean;
};

type Props = {
  data: any
}

export type Page = {
  route: PageRoute & RouteProps;
  Component: (props: Props) => JSX.Element
  meta: PageMeta;
};
