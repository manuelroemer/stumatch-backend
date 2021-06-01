import { model } from 'mongoose';
import { createDbObjectSchema, DbObject } from './dbObject';

export interface FriendsListEntry extends DbObject {
  user1: string;
  user2: string;
}

const friendsListEntrySchema = createDbObjectSchema<FriendsListEntry>({
  user1: {
    type: String,
    required: true,
  },
  user2: {
    type: String,
    required: true,
  },
  __uniquenessConstraint: {
    type: String,
    required: true,
    unique: true,
    default: function (this: FriendsListEntry) {
      const [a, b] = [this.user1, this.user2].sort((a, b) => a.localeCompare(b));
      return a + ';' + b;
    },
  },
});

export const FriendsListEntryModel = model<FriendsListEntry>('FriendsListEntry', friendsListEntrySchema);
