import type { Page as PageComponent } from './types';
import { Root } from './Root';
import { Home } from './Home';
import { Setup } from './Setup'

export type Page = PageComponent;
export const Pages = [Root, Home, Setup];
