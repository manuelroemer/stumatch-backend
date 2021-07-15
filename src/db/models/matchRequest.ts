import { model } from 'mongoose';
import { emitResourceChangedEvent } from '../../sockets/emitResourceChangedEvent';
import { createDbObjectSchema, DbObject } from './dbObject';

export interface MatchRequest extends DbObject {
  matchResultId?: string;
  userId: string;
  facultyId?: string;
  studyProgramId?: string;
  minSemester?: number;
  maxSemester?: number;
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
  facultyId: {
    type: String,
  },
  studyProgramId: {
    type: String,
  },
  minSemester: {
    type: Number,
  },
  maxSemester: {
    type: Number,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

matchRequestSchema.post('save', (doc: Document & MatchRequest, next) => {
  emitResourceChangedEvent(
    {
      resourceType: 'matchRequest',
      changeType: 'changed',
      id: doc!.id!,
    },
    doc!.userId,
  );

  next();
});

export const MatchRequestModel = model<MatchRequest>('MatchRequest', matchRequestSchema);
