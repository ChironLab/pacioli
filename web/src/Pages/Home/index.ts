import HomeComponent from './Home';
import type { Page, PageMeta } from '../types';
import { HOME_PATH } from './constants';

const route = {
  path: HOME_PATH,
  component: HomeComponent,
};

const meta: PageMeta = {
  name: 'Home',
};

export const Home: Page = {
  route,
  meta,
};
