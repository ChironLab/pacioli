import CustomerComponent from './Customer';
import { MonetizationOnRounded } from '@material-ui/icons';
import type { Page, PageMetaWithNav } from '../types';
import { HOME_PATH } from '../../constants';

const route = {
  path: `${HOME_PATH}/customer`,
  exact: true,
};

const meta: PageMetaWithNav = {
  name: 'Customer Center',
  icon: MonetizationOnRounded,
  navPosition: 'top',
};

export const Customer: Page = {
  route,
  meta,
  Component: CustomerComponent,
};
