import { model } from 'mongoose';
import { emitResourceChangedEvent } from '../../sockets/emitResourceChangedEvent';
import { createDbObjectSchema, DbObject } from './dbObject';
import { MatchRequestModel } from './matchRequest';

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

matchResultSchema.post('save', async (doc: Document & MatchResult, next) => {
  const matchRequest1 = await MatchRequestModel.findOne({ _id: doc.matchRequest1Id });
  const matchRequest2 = await MatchRequestModel.findOne({ _id: doc.matchRequest2Id });

  emitResourceChangedEvent(
    {
      resourceType: 'matchRequest',
      changeType: 'changed',
      id: matchRequest1!.id,
    },
    matchRequest1!.userId,
  );

  emitResourceChangedEvent(
    {
      resourceType: 'matchRequest',
      changeType: 'changed',
      id: matchRequest2!.id,
    },
    matchRequest2!.userId,
  );

  next();
});

export const MatchResultModel = model<MatchResult>('MatchResult', matchResultSchema);
