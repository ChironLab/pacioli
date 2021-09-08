import { Vendor } from './Vendor';
import { Customer } from './Customer';
import { Dashboard } from './Dashboard';
import { Settings } from './Settings';
import { Accountant } from './Accountant';
import { Account } from './Account';

import type { Page as PageComponent } from './types';

export const pages: PageComponent[] = [
  Dashboard,
  Vendor,
  Customer,
  Accountant,
  Settings,
  Account,
];

export type Page = PageComponent;
