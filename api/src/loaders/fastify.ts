import { fastify } from 'fastify';
import type { ApolloServer } from 'apollo-server-fastify';
import cors from 'fastify-cors';
import helmet from 'fastify-helmet';
import type { Config } from '../config';

export const fastifyLoader = (config: Config, apollo: ApolloServer) => {
  const app = fastify({
    logger: config.logger,
  });

  app.register(apollo.createHandler({ path: '/graphql', cors: false }));
  app.register(cors);
  app.register(helmet, { contentSecurityPolicy: false });

  return app;
};
