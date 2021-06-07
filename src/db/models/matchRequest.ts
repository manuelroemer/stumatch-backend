import { model } from 'mongoose';
import { createDbObjectSchema, DbObject } from './dbObject';

export interface MatchRequest extends DbObject {
  matchResultId?: string;
  userId: string;
  isDeleted: boolean;
}

const matchRequestSchema = createDbObjectSchema<MatchRequest>({
  matchResultId: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const MatchRequestModel = model<MatchRequest>('MatchRequest', matchRequestSchema);
