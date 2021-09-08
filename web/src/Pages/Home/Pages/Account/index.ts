import AccountComponent from './Account';
import type { Page, PageMetaWithNoNav } from '../types';
import { HOME_PATH } from '../../constants';

const route = {
  path: `${HOME_PATH}/account/:accountId`,
  exact: true,
};

const meta: PageMetaWithNoNav = {
  name: 'Account',
  navPosition: 'none',
};

export const Account: Page = {
  route,
  meta,
  Component: AccountComponent,
};
