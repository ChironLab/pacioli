import pino from 'pino';

export const initLogger = (_: string) => {
  //  Pretty Print Option
  const prettyPrint = {
    colorize: true,
    translateTime: true,
    ignore: 'pid,hostname',
  };

  //  Create a logger instance
  const logger = pino({
    prettyPrint,
  });

  return logger;
};
