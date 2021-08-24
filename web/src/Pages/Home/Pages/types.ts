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

export type Props = {
  isModalOpen: boolean;
  toggleModal: () => void;
};

export type Page = {
  route: PageRoute & RouteProps;
  Component: (props: Props) => JSX.Element;
  meta: PageMeta;
};
