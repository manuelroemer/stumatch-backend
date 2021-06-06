import { model } from 'mongoose';
import { createDbObjectSchema, DbObject } from './dbObject';

export interface MatchRequest extends DbObject {
  matchResultId?: string;
  userId: string;
}

const matchRequestSchema = createDbObjectSchema<MatchRequest>({
  matchResultId: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
});

export const MatchRequestModel = model<MatchRequest>('MatchRequest', matchRequestSchema);
