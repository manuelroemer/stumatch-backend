import { model } from 'mongoose';
import { createDbObjectSchema, DbObject } from './dbObject';

export interface Post extends DbObject {
  content: string;
}

const postSchema = createDbObjectSchema<Post>({
  content: {
    type: String,
    required: true,
  },
});

export const PostModel = model<Post>('Post', postSchema);
