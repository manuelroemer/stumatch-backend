import { Router } from 'express';
import { PostModel } from '../../db/models/post';
import { UserModel } from '../../db/models/user';
import { NotFoundError } from '../../dtos/apiErrors';
import { apiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';

const handler = asyncRequestHandler(async (req, res) => {
  const id = req.params.id;
  const post = await PostModel.findById(id);

  if (!post) {
    throw new NotFoundError();
  }
  const post_author = await UserModel.findById(post.authorId);
  const post_w_a = {
    ...post.toObject(),
    author: post_author,
    likes: 100,
    comments: 100,
  };

  return res.status(200).json(apiResult(post_w_a));
});

export default Router().get('/api/v1/posts/:id', authenticateJwt, handler);
