import { Router } from 'express';
import { PostModel } from '../../db/models/post';
import { NotFoundError } from '../../errors/apiErrors';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';

const get = asyncRequestHandler(async (req, res) => {
  const id = req.params.id;
  const post = await PostModel.findById(id);

  if (!post) {
    throw new NotFoundError();
  }

  return res.status(200).apiResult({ result: post.toObject() });
});

export default Router().get('/api/v1/posts/:id', authenticateJwt, get);