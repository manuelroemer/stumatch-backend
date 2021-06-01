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
});

export const FriendsListEntryModel = model<FriendsListEntry>('FriendsListEntry', friendsListEntrySchema);
