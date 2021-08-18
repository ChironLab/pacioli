import fastifyStatic from 'fastify-static';
import path from 'path';
import type { FastifyInstance } from 'fastify';

export const initServeStatic = (app: FastifyInstance) => {
  app.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
  });
};
