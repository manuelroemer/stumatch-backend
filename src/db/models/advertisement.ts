import { model } from 'mongoose';
import { createDbObjectSchema, DbObject } from './dbObject';

export type knownstatus = 'unverified' | 'pendingVerification' | 'verified' | 'denied';
export interface Advertisement extends DbObject {
  userId: string;
  title: string;
  content: string;
  status: knownstatus;
}

const AdvertisementSchema = createDbObjectSchema<Advertisement>({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'unverified',
  },
});

export const AdvertisementModel = model<Advertisement>('Advertisement', AdvertisementSchema);
