import 'dotenv/config';
import { initConfig } from './config';
import { initLoaders } from './loaders';
import { initServices } from './services';

const bootstrap = async () => {
  const config = initConfig();
  const services = initServices(config);
  const { app } = await initLoaders(config, services);

  app.ready(() => {
    config.logger.info(app.printRoutes());
  });

  await app.listen(config.env.port);
};

bootstrap();
