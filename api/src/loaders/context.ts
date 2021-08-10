import type { PrismaClient } from '@prisma/client';
import type { Environment } from '../config';
import type { Services } from '../services';

export type Context = {
  db: PrismaClient;
  env: Environment;
  services: Services;
};
