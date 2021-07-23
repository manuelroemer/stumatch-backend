import { CommentModel } from '../db/models/comment';
import { LikeModel } from '../db/models/like';
import { Post } from '../db/models/post';
import { UserModel } from '../db/models/user';
import { object, SchemaOf, string } from 'yup';

export interface PostRequestBody {
  id?: string;
  title: string;
  content: string;
  category: string;
  postImageBlob?: string;
}

export const postValidationSchema: SchemaOf<PostRequestBody> = object({
  id: string().uuid(),
  title: string().required(),
  content: string().required(),
  category: string().required(),
  postImageBlob: string(),
}).defined();

export async function getEnrichedPostDto(post: Post) {
  const author = await UserModel.findById(post.authorId);
  const likes = await LikeModel.find({ postId: post.id });
  const comments = await CommentModel.find({ postId: post.id });

  return {
    ...post,
    author,
    likes,
    comments,
  };
}
