import SetupComponent from './Setup';
import type { Page, PageMeta } from '../types';

const route = {
  path: '/setup',
  exact: true,
  component: SetupComponent,
};

const meta: PageMeta = {
  name: 'Setup',
};

export const Setup: Page = {
  route,
  meta,
};
