import { logger } from './log';

// Dev builds can leverage a local .env file for custom settings.
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const dotenv = require('dotenv');
  dotenv.config();
  logger.info('Using development configuration values from the .env file.');
}

export const config = {
  port: process.env.PORT ?? 4040,
  dbConnectionString: process.env.MONGODB_CONNECTION_STRING ?? '',
};
