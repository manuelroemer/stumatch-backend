import { BlobModel, Blob } from '../db/models/blob';

export async function createBlobFromString(data: string, encoding: BufferEncoding) {
  return createBlobFromBuffer(Buffer.from(data, encoding));
}

export async function createBlobFromBuffer(data: Buffer): Promise<Blob> {
  const blob = await BlobModel.create({ data });
  return blob.toObject();
}
