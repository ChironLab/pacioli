import type { Page as PageComponent } from './types';
import { Root } from './Root';
import { Home } from './Home';
import { Vendor } from './Vendor';
import { Customer } from './Customer';
import { Accountant } from './Accountant';

export type Page = PageComponent;
export const Pages: PageComponent[] = [
  Root,
  Home,
  Vendor,
  Customer,
  Accountant,
];
