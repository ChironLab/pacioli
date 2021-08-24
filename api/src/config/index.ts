import { env } from './env';
import { initLogger } from './logger';
import { initPrisma } from './prisma';

export const initConfig = () => {
  const logger = initLogger(env.environment);
  const prisma = initPrisma(env.environment);
  return {
    env,
    logger,
    prisma,
  };
};

export type Environment = typeof env;
export type Config = ReturnType<typeof initConfig>;
