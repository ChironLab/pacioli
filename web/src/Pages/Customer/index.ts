import CustomerComponent from './Customer';
import { MonetizationOnRounded } from '@material-ui/icons';
import type { Page, PageMeta } from '../types';

const route = {
  path: '/home/customer',
  exact: true,
  component: CustomerComponent,
};

const meta: PageMeta = {
  name: 'Customer Center',
  icon: MonetizationOnRounded,
  navPosition: 'top',
};

export const Customer: Page = {
  route,
  meta,
};
