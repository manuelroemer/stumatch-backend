import { model, Schema } from 'mongoose';

export interface Post {
  content: string;
}

const PostSchema = new Schema<Post>({
  content: {
    type: String,
    required: true,
    unique: false,
  },
});

export const PostModel = model<Post>('Post', PostSchema);
