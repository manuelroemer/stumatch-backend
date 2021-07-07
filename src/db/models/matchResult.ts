import { model } from 'mongoose';
import { logger } from '../../log';
import { createDbObjectSchema, DbObject } from './dbObject';
import { NotificationModel } from './notification';

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
  try {
    await NotificationModel.create({
      type: 'matchRequestFoundMatch',
      matchRequestId: doc.matchRequest1Id,
    });
    await NotificationModel.create({
      type: 'matchRequestFoundMatch',
      matchRequestId: doc.matchRequest2Id,
    });
  } catch (e) {
    logger.warning('Friendslist notification creation failed.', e);
  } finally {
    next();
  }
});

export const MatchResultModel = model<MatchResult>('MatchResult', matchResultSchema);
