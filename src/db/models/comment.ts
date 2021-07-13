import { model } from 'mongoose';
import { createDbObjectSchema, DbObject } from './dbObject';

export interface Comment extends DbObject {
  authorId: string;
  postId: string;
  content: string;
}

const commentSchema = createDbObjectSchema<Comment>({
  authorId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export const CommentModel = model<Comment>('Comment', commentSchema);
