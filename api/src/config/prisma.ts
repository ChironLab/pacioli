import { PrismaClient } from '@prisma/client';

export const initPrisma = (environment: string) => {
  const client = new PrismaClient({
    ...(environment === 'development' && {
      log: ['query', 'info', 'warn', 'error'],
    }),
  });
  return client;
};
