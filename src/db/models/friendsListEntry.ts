import { model, Document } from 'mongoose';
import { tryCreateFriendRequestAcceptedNotification } from '../../endpointHelpers/notification';
import { logger } from '../../log';
import { createDbObjectSchema, DbObject } from './dbObject';
import { UserModel } from './user';

export interface FriendsListEntry extends DbObject {
  user1Id: string;
  user2Id: string;
}

const friendsListEntrySchema = createDbObjectSchema<FriendsListEntry>({
  user1Id: {
    type: String,
    required: true,
  },
  user2Id: {
    type: String,
    required: true,
  },
  __uniquenessConstraint: {
    type: String,
    required: true,
    unique: true,
    default: function (this: FriendsListEntry) {
      const [a, b] = [this.user1Id, this.user2Id].sort((a, b) => a.localeCompare(b));
      return a + ';' + b;
    },
  },
});

friendsListEntrySchema.post('save', async (doc: Document & FriendsListEntry, next) => {
  try {
    const user1 = await UserModel.findById(doc.user1Id);
    const user2 = await UserModel.findById(doc.user2Id);
    await tryCreateFriendRequestAcceptedNotification(user1!.id!, user2!);
    await tryCreateFriendRequestAcceptedNotification(user2!.id!, user1!);
  } catch (e) {
    logger.warning('Friendslist notification creation failed.', e);
  } finally {
    next();
  }
});

export const FriendsListEntryModel = model<FriendsListEntry>('FriendsListEntry', friendsListEntrySchema);
