import type { Page as PageComponent } from './types';
import { Root } from './Root';
import { Home } from './Home';

export type Page = PageComponent;
export const Pages = [Root, Home];
