import { logger } from './log';
import dotenv from 'dotenv';

// Dev builds can leverage a local .env file for custom settings.
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
  logger.info('[Config] Using development configuration values from the .env file.');
}

export const config = {
  serverPort: process.env.SERVER_PORT ?? process.env.$PORT ?? 4040,
  dbConnectionString: process.env.DB_CONNECTION_STRING ?? '',
  authJwtSecret: process.env.AUTH_JWT_SECRET ?? 'nosecret',
  authJwtIssuer: process.env.AUTH_JWT_ISSUER ?? 'sTUMatch',
};
