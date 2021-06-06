import { model } from 'mongoose';
import { createDbObjectSchema, DbObject } from './dbObject';

export interface MatchResult extends DbObject {
  matchRequest1Id: string;
  matchRequest2Id: string;
  acceptedByUser1: boolean | null;
  acceptedByUser2: boolean | null;
}

const matchResultSchema = createDbObjectSchema<MatchResult>({
  matchRequest1Id: {
    type: String,
    required: true,
  },
  matchRequest2Id: {
    type: String,
    required: true,
  },
  acceptedByUser1: {
    type: Boolean,
    default: null,
  },
  acceptedByUser2: {
    type: Boolean,
    default: null,
  },
});

export const MatchResultModel = model<MatchResult>('MatchResult', matchResultSchema);
