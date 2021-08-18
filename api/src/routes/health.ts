import type { FastifyInstance } from 'fastify';

export const initHealthCheck = (app: FastifyInstance) => {
  app.get(
    '/health',
    {
      schema: {
        response: {
          '2xx': {
            type: 'string',
          },
        },
      },
    },
    (_req, res) => {
      res.send('OK');
    }
  );
};
