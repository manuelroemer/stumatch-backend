import { model } from 'mongoose';
import { logger } from '../../log';
import { createDbObjectSchema, DbObject } from './dbObject';
import { NotificationModel } from './notification';

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
    await NotificationModel.create({
      type: 'matchRequestAccepted',
      userId: doc.user1Id,
      friendsListEntryId: doc.id,
    });
    await NotificationModel.create({
      type: 'matchRequestAccepted',
      userId: doc.user2Id,
      friendsListEntryId: doc.id,
    });
  } catch (e) {
    logger.warning('Friendslist notification creation failed.', e);
  } finally {
    next();
  }
});

export const FriendsListEntryModel = model<FriendsListEntry>('FriendsListEntry', friendsListEntrySchema);
