import { createDbObjectSchema, DbObject } from './dbObject';
import { model } from 'mongoose';

export interface PastUserMatchEntry extends DbObject {
  user1Id: string;
  user2Id: string;
}
const pastUserMatchEntrySchema = createDbObjectSchema<PastUserMatchEntry>({
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
    default: function (this: PastUserMatchEntry) {
      const [a, b] = [this.user1Id, this.user2Id].sort((a, b) => a.localeCompare(b));
      return a + ';' + b;
    },
  },
});

export const PastUserMatchEntryModel = model<PastUserMatchEntry>('PastUserMatchEntry', pastUserMatchEntrySchema);
