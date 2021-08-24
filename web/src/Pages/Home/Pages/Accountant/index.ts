import { LocalAtmRounded } from '@material-ui/icons';
import AccountantComponent from './Accountant';
import type { Page, PageMeta } from '../types';
import { HOME_PATH } from '../../constants';

const route = {
  path: `${HOME_PATH}/accountant`,
  exact: true,
};

const meta: PageMeta = {
  name: 'Accountant',
  icon: LocalAtmRounded,
  navPosition: 'bottom',
};

export const Accountant: Page = {
  route,
  meta,
  Component: AccountantComponent,
};
