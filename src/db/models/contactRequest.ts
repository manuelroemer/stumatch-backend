import { model } from 'mongoose';
import { createDbObjectSchema, DbObject } from './dbObject';

export interface ContactRequest extends DbObject {
  name: string;
  email: string;
  type: 'role' | 'featureBug' | 'other';
  message: string;
  userId?: string;
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
});

export const ContactRequestModel = model<ContactRequest>('ContactRequest', contactRequestSchema);
