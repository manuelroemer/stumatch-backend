import { model } from 'mongoose';
import { createDbObjectSchema, DbObject } from './dbObject';

export interface MatchRequest extends DbObject {
  matchResultId?: string;
  userId: string;
  isDeleted: boolean;
  facultyId?: string;
  studyProgramId?: string;
  minSemester?: number;
  maxSemester?: number;
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
});

export const MatchRequestModel = model<MatchRequest>('MatchRequest', matchRequestSchema);
