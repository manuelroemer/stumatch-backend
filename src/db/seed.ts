import mongoose from 'mongoose';
import { logger } from '../log';
import { establishDbConnection } from './connection';
import { PostModel } from './models/post';
import { postSeed } from './models/postSeed';
import { UserModel } from './models/user';
import { userSeed } from './models/userSeed';

(async function () {
  try {
    await establishDbConnection();

    logger.info('Clearing existing data...');
    await UserModel.deleteMany();
    await PostModel.deleteMany();
    logger.info('Existing data cleared.');

    logger.info('Creating seed data...');
    await UserModel.create(userSeed);
    await PostModel.create(postSeed);
    logger.info('Seed data created.');
  } catch (err) {
    logger.error(`Seeding the database failed: ${err?.message ?? err}`, err);
  } finally {
    mongoose.disconnect();
  }
})();