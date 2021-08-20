import VendorComponent from './Vendor';
import { ReceiptRounded } from '@material-ui/icons';
import type { Page, PageMeta } from '../types';

const route = {
  path: '/home/vendor',
  exact: true,
  component: VendorComponent,
};

const meta: PageMeta = {
  name: 'Vendor Center',
  icon: ReceiptRounded,
  navPosition: 'top',
};

export const Vendor: Page = {
  route,
  meta,
};
