import { Router } from 'express';
import { PostModel } from '../../db/models/post';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';

const getAll = asyncRequestHandler(async (_req, res) => {
  const posts = await PostModel.find();
  return res.status(200).apiResult({ result: posts.map((post) => post.toObject()) });
});

export default Router().get('/api/v1/posts', authenticateJwt, getAll);
