import type { FastifyInstance } from 'fastify';
import { initHealthCheck } from './health';
import { initServeStatic } from './static';

export const initRoutes = (app: FastifyInstance) => {
  initHealthCheck(app);
  initServeStatic(app);
};
