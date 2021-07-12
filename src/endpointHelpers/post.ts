import { Post } from '../db/models/post';
import { UserModel } from '../db/models/user';

export async function getEnrichedPostDto(post: Post) {
  const author = await UserModel.findById(post.authorId);

  return {
    ...post,
    author,
    likes: 100,
    comments: 100,
  };
}
