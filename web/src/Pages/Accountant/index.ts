import AccountantComponent from './Accountant';
import { BallotRounded } from '@material-ui/icons';
import type { Page, PageMeta } from '../types';

const route = {
  path: '/home/accountant',
  exact: true,
  component: AccountantComponent,
};

const meta: PageMeta = {
  name: 'Accountant',
  icon: BallotRounded,
  navPosition: 'bottom',
};

export const Accountant: Page = {
  route,
  meta,
};
