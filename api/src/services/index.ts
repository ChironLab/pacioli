import type { Config } from '../config';
import * as util from './util';
import { initAccountingService } from './accounting';

export const initServices = (_: Config) => {
  const accounting = initAccountingService();
  return {
    accounting,
    util,
  };
};

export type Services = ReturnType<typeof initServices>;
