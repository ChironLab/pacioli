import { ApolloServer } from 'apollo-server-fastify';
import { applyMiddleware } from 'graphql-middleware';
import { schema as nexusSchema } from './schema';
import type { Context } from './context';
import type { Config } from '../config';
import type { Services } from '../services';

export const apolloLoader = async (config: Config, services: Services) => {
  const { env, logger } = config;
  const { environment } = env;

  const schema = applyMiddleware(nexusSchema);

  const apollo = new ApolloServer({
    schema,
    introspection: environment !== 'production',
    logger,
    context: async (): Promise<Context> => {
      return {
        db: config.prisma,
        env,
        services,
      };
    },
  });

  await apollo.start();

  return apollo;
};
