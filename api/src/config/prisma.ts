import { PrismaClient } from '@prisma/client';

export const initPrisma = () => {
  const client = new PrismaClient();
  return client;
};
