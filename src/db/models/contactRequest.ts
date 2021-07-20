import { model } from 'mongoose';
import { createDbObjectSchema, DbObject } from './dbObject';

export interface ContactRequest extends DbObject {
  name: string;
  email: string;
  type: 'role' | 'featureBug' | 'other';
  message: string;
  userId?: string;
  status: 'open' | 'inProgress' | 'closed';
}

const contactRequestSchema = createDbObjectSchema<ContactRequest>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  status: {
    type: String,
    default: 'open',
    required: true,
  },
});

export const ContactRequestModel = model<ContactRequest>('ContactRequest', contactRequestSchema);
