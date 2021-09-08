import SettingComponent from './Settings';
import { SettingsRounded } from '@material-ui/icons';
import type { Page, PageMetaWithNav } from '../types';
import { HOME_PATH } from '../../constants';

const route = {
  path: `${HOME_PATH}/settings`,
  exact: true,
};

const meta: PageMetaWithNav = {
  name: 'Settings',
  icon: SettingsRounded,
  navPosition: 'bottom',
};

export const Settings: Page = {
  route,
  meta,
  Component: SettingComponent,
};
