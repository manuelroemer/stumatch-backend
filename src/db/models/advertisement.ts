import { model } from 'mongoose';
import { createDbObjectSchema, DbObject } from './dbObject';
export interface Advertisement extends DbObject {
  authorId: string;
  title: string;
  shortDescription?: string;
  content: string;
  facultyId?: string;
  studyProgramId?: string;
  startDate: Date;
  endDate: Date;
  status: 'unverified' | 'pendingVerification' | 'verified' | 'denied';
}

const advertisementSchema = createDbObjectSchema<Advertisement>({
  authorId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  facultyId: {
    type: String,
    required: false,
  },
  studyProgramId: {
    type: String,
    required: false,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'unverified',
  },
});

export const AdvertisementModel = model<Advertisement>('Advertisement', advertisementSchema);
