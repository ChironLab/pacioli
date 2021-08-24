import { Vendor } from './Vendor';
import { Customer } from './Customer';
import { Accountant } from './Accountant';
import { Dashboard } from './Dashboard';
import type { Page as PageComponent } from './types';

export const pages: PageComponent[] = [Dashboard, Vendor, Customer, Accountant];

export type Page = PageComponent;
