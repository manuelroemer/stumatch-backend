import { model } from 'mongoose';
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

export const MatchRequestModel = model<MatchRequest>('MatchRequest', matchRequestSchema);
