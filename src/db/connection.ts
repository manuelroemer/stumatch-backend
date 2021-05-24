import { connect } from 'mongoose';
import { config } from '../config';
import { logger } from '../log';

/**
 * Connects to the configured database.
 * Throws on failure to establish a connection.
 */
export async function establishDbConnection() {
  try {
    await connect(config.dbConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info('[DB] Successfully established the database connection.');
  } catch (e) {
    logger.error('[DB] Failed to establish a database connection.', e);
    throw e;
  }
}
