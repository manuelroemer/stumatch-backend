import mongoose from 'mongoose';
import { logger } from '../log';
import { establishDbConnection } from './connection';
import { FriendsListEntryModel } from './models/friendsListEntry';
import { friendsListEntrySeed } from './models/friendsListEntrySeed';
import { MatchRequestModel } from './models/matchRequest';
import { matchRequestSeed } from './models/matchRequestSeed';
import { MatchResultModel } from './models/matchResult';
import { matchResultSeed } from './models/matchResultSeed';
import { NotificationModel } from './models/notification';
import { notificationSeed } from './models/notificationSeed';
import { PostModel } from './models/post';
import { postSeed } from './models/postSeed';
import { UserModel } from './models/user';
import { userSeed } from './models/userSeed';

(async function () {
  try {
    await establishDbConnection();

    logger.info('[DB] Clearing existing data...');
    await UserModel.deleteMany();
    await PostModel.deleteMany();
    await NotificationModel.deleteMany();
    await FriendsListEntryModel.deleteMany();
    await MatchRequestModel.deleteMany();
    await MatchResultModel.deleteMany();
    logger.info('[DB] Existing data cleared.');

    logger.info('[DB] Creating seed data...');
    await UserModel.create(mapSeedIds(userSeed));
    await PostModel.create(mapSeedIds(postSeed));
    await NotificationModel.create(mapSeedIds(notificationSeed));
    await FriendsListEntryModel.create(mapSeedIds(friendsListEntrySeed));
    await MatchRequestModel.create(mapSeedIds(matchRequestSeed));
    await MatchResultModel.create(mapSeedIds(matchResultSeed));
    logger.info('[DB] Seed data created.');
  } catch (err) {
    logger.error(`[DB] Seeding the database failed: ${err?.message ?? err}`, err);
  } finally {
    mongoose.disconnect();
  }
})();

function mapSeedIds(seeds: Array<any>) {
  return seeds.map((seed) => {
    seed._id = seed.id;
    delete seed.id;
    return seed;
  });
}
