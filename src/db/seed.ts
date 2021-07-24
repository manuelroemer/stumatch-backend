import mongoose from 'mongoose';
import { server, ws } from '..';
import { logger } from '../log';
import { establishDbConnection } from './connection';
import { AdvertisementModel } from './models/advertisement';
import { advertisementSeed } from './models/advertisementSeed';
import { BlobModel } from './models/blob';
import { blobSeed } from './models/blobSeed';
import { ChatGroupModel } from './models/chatGroup';
import { chatGroupSeed } from './models/chatGroupSeed';
import { ChatMessageModel } from './models/chatMessage';
import { chatMessageSeed } from './models/chatMessageSeed';
import { CommentModel } from './models/comment';
import { LikeModel } from './models/like';
import { ContactRequestModel } from './models/contactRequest';
import { contactRequestSeed } from './models/contactRequestSeed';
import { FacultyModel } from './models/faculty';
import { facultySeed } from './models/facultySeed';
import { FriendsListEntryModel } from './models/friendsListEntry';
import { friendsListEntrySeed } from './models/friendsListEntrySeed';
import { MatchRequestModel } from './models/matchRequest';
import { matchRequestSeed } from './models/matchRequestSeed';
import { MatchResultModel } from './models/matchResult';
import { matchResultSeed } from './models/matchResultSeed';
import { NotificationModel } from './models/notification';
import { notificationSeed } from './models/notificationSeed';
import { PastUserMatchEntryModel } from './models/pastUserMatchEntry';
import { PostModel } from './models/post';
import { postSeed } from './models/postSeed';
import { ReadChatMessageModel } from './models/readChatMessage';
import { readChatMessageSeed } from './models/readChatMessageSeed';
import { UserModel } from './models/user';
import { userSeed } from './models/userSeed';
import { commentSeed } from './models/commentSeed';
import { likeSeed } from './models/likeSeed';

(async function () {
  try {
    await establishDbConnection();

    logger.info('[DB] Clearing existing data...');
    await UserModel.deleteMany();
    await PostModel.deleteMany();
    await NotificationModel.deleteMany();
    await FriendsListEntryModel.deleteMany();
    await ChatGroupModel.deleteMany();
    await ChatMessageModel.deleteMany();
    await ReadChatMessageModel.deleteMany();
    await MatchRequestModel.deleteMany();
    await MatchResultModel.deleteMany();
    await FacultyModel.deleteMany();
    await AdvertisementModel.deleteMany();
    await PastUserMatchEntryModel.deleteMany();
    await BlobModel.deleteMany();
    await ContactRequestModel.deleteMany();
    await LikeModel.deleteMany();
    await CommentModel.deleteMany();
    logger.info('[DB] Existing data cleared.');

    logger.info('[DB] Creating seed data...');
    await UserModel.create(mapSeedIds(userSeed));
    await PostModel.create(mapSeedIds(postSeed));
    await NotificationModel.create(mapSeedIds(notificationSeed));
    await FriendsListEntryModel.create(mapSeedIds(friendsListEntrySeed));
    await ChatGroupModel.create(mapSeedIds(chatGroupSeed));
    await ChatMessageModel.create(mapSeedIds(chatMessageSeed));
    await ReadChatMessageModel.create(mapSeedIds(readChatMessageSeed));
    await MatchRequestModel.create(mapSeedIds(matchRequestSeed));
    await MatchResultModel.create(mapSeedIds(matchResultSeed));
    await FacultyModel.create(mapSeedIds(facultySeed));
    await AdvertisementModel.create(mapSeedIds(advertisementSeed));
    await BlobModel.create(mapSeedIds(blobSeed));
    await ContactRequestModel.create(mapSeedIds(contactRequestSeed));
    await LikeModel.create(mapSeedIds(likeSeed));
    await CommentModel.create(mapSeedIds(commentSeed));

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
