import type { Config } from '../config';
import * as util from './util';

export const initServices = (_: Config) => {
  return {
    util,
  };
};

export type Services = ReturnType<typeof initServices>;
