import HomeComponent from './Home';
import { HomeRounded } from '@material-ui/icons';
import type { Page, PageMeta } from '../types';

const route = {
  path: '/home',
  exact: false,
  component: HomeComponent,
};

const meta: PageMeta = {
  name: 'Home',
  icon: HomeRounded,
  navPosition: 'bottom',
};

export const Home: Page = {
  route,
  meta,
};
