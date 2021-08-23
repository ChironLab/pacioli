import AccountantComponent from './Accountant';
import { BallotRounded } from '@material-ui/icons';
import type { Page, PageMeta } from '../types';
import { HOME_PATH } from '../constants';

const route = {
  path: `${HOME_PATH}/accountant`,
  exact: true,
};

const meta: PageMeta = {
  name: 'Accountant',
  icon: BallotRounded,
  navPosition: 'bottom',
};

export const Accountant: Page = {
  route,
  meta,
  Component: AccountantComponent
};
