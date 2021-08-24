import VendorComponent from './Vendor';
import { ReceiptRounded } from '@material-ui/icons';
import type { Page, PageMeta } from '../types';
import { HOME_PATH } from '../../constants';

const route = {
  path: `${HOME_PATH}/vendor`,
  exact: true,
};

const meta: PageMeta = {
  name: 'Vendor Center',
  icon: ReceiptRounded,
  navPosition: 'top',
};

export const Vendor: Page = {
  route,
  meta,
  Component: VendorComponent,
};
