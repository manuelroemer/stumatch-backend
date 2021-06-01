import { model } from 'mongoose';
import { createDbObjectSchema, DbObject } from './dbObject';

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

export const FriendsListEntryModel = model<FriendsListEntry>('FriendsListEntry', friendsListEntrySchema);
