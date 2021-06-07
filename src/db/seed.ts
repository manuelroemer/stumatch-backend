import mongoose from 'mongoose';
import { server, ws } from '..';
import { logger } from '../log';
import { establishDbConnection } from './connection';
import { ChatGroupModel } from './models/chatGroup';
import { chatGroupSeed } from './models/chatGroupSeed';
import { FriendsListEntryModel } from './models/friendsListEntry';
import { friendsListEntrySeed } from './models/friendsListEntrySeed';
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
    await ChatGroupModel.deleteMany();
    logger.info('[DB] Existing data cleared.');

    logger.info('[DB] Creating seed data...');
    await UserModel.create(mapSeedIds(userSeed));
    await PostModel.create(mapSeedIds(postSeed));
    await NotificationModel.create(mapSeedIds(notificationSeed));
    await FriendsListEntryModel.create(mapSeedIds(friendsListEntrySeed));
    await ChatGroupModel.create(mapSeedIds(chatGroupSeed));
    logger.info('[DB] Seed data created.');
  } catch (err) {
    logger.error(`[DB] Seeding the database failed: ${err?.message ?? err}`, err);
  } finally {
    mongoose.disconnect();
    server.close();
    ws.close();
  }
})();

function mapSeedIds(seeds: Array<any>) {
  return seeds.map((seed) => {
    seed._id = seed.id;
    delete seed.id;
    return seed;
  });
}
