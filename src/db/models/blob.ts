import { model } from 'mongoose';
import { createDbObjectSchema, DbObject } from './dbObject';

export interface Blob extends DbObject {
  data: Buffer;
}

const blobSchema = createDbObjectSchema<Blob>({
  data: {
    type: Buffer,
    required: true,
  },
});

export const BlobModel = model<Blob>('Blob', blobSchema);
