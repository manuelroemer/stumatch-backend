import { model } from 'mongoose';
import { createDbObjectSchema, DbObject } from './dbObject';

export interface Post extends DbObject {
  content: string;
  title: string;
  authorId: string;
  category: string;
  postImageBlobId?: string;
}

const postSchema = createDbObjectSchema<Post>({
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  postImageBlobId: {
    type: String,
  },
});

export const PostModel = model<Post>('Post', postSchema);
