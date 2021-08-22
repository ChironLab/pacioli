import RootComponent from './Root';
import type { Page, PageMeta } from '../types';

const route = {
  path: '/',
  exact: true,
  component: RootComponent,
};

const meta: PageMeta = {
  name: 'Root',
};

export const Root: Page = {
  route,
  meta,
};
