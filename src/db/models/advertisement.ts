import { model } from 'mongoose';
import { createDbObjectSchema, DbObject } from './dbObject';
export interface Advertisement extends DbObject {
  userId: string;
  title: string;
  shortDescription?: string;
  content: string;
  facultyId?: string;
  status: 'unverified' | 'pendingVerification' | 'verified' | 'denied';
}

const advertisementSchema = createDbObjectSchema<Advertisement>({
  userId: {
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
  status: {
    type: String,
    required: true,
    default: 'unverified',
  },
});

export const AdvertisementModel = model<Advertisement>('Advertisement', advertisementSchema);
