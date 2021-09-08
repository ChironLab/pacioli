import DashboardComponent from './Dashboad';
import { HomeRounded } from '@material-ui/icons';
import type { Page, PageMetaWithNav } from '../types';
import { HOME_PATH } from '../../constants';

const route = {
  path: HOME_PATH,
  exact: true,
};

const meta: PageMetaWithNav = {
  name: 'Dashboard',
  icon: HomeRounded,
  navPosition: 'top',
};

export const Dashboard: Page = {
  route,
  meta,
  Component: DashboardComponent,
};
