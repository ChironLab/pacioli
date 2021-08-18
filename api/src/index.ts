import { initConfig } from './config';
import { initLoaders } from './loaders';
import { initServices } from './services';
import { schema } from './graphql';
import { initRoutes } from './routes';

const bootstrap = async () => {
  const config = initConfig();
  const services = initServices(config);
  const { app } = await initLoaders(config, services, schema);
  initRoutes(app);

  app.ready(() => {
    config.logger.info(app.printRoutes());
  });

  await app.listen(config.env.port);
};

bootstrap();
