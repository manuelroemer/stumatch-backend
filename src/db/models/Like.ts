import { model } from 'mongoose';
import { createDbObjectSchema, DbObject } from './dbObject';

export interface Like extends DbObject {
  userId: string;
  postId: string;
}

const likeSchema = createDbObjectSchema<Like>({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
});

export const LikeModel = model<Like>('Like', likeSchema);
