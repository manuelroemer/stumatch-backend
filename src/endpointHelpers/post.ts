import { CommentModel } from '../db/models/comment';
import { LikeModel } from '../db/models/Like';
import { Post } from '../db/models/post';
import { UserModel } from '../db/models/user';

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
