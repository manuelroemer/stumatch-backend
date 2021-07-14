import { model } from 'mongoose';
import { createDbObjectSchema, DbObject } from './dbObject';

export interface MatchResult extends DbObject {
  matchRequest1Id: string;
  matchRequest2Id: string;
  acceptedByUser1: boolean | undefined;
  acceptedByUser2: boolean | undefined;
  chatGroupId: string;
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
  },
  acceptedByUser2: {
    type: Boolean,
  },
  chatGroupId: {
    type: String,
    required: true,
  },
});

export const MatchResultModel = model<MatchResult>('MatchResult', matchResultSchema);
