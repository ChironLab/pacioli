import type { GraphQLSchema } from '../graphql';
import type { Config } from '../config';
import type { Services } from '../services';
import { apolloLoader } from './apollo';
import { fastifyLoader } from './fastify';

export const initLoaders = async (
  config: Config,
  services: Services,
  graphqlSchema: GraphQLSchema
) => {
  const apollo = await apolloLoader(config, services, graphqlSchema);
  const app = fastifyLoader(config, apollo);

  return {
    apollo,
    app,
  };
};
