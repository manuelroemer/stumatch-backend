import { RequestHandler, Router } from 'express';
import { PostModel } from '../db/models/post';
import { authenticateJwt } from '../middlewares/authenticateJwt';

const getAll: RequestHandler = async (_, res) => {
  const posts = await PostModel.find();
  return res.status(200).json(posts);
};

const post: RequestHandler = async (req, res) => {
  const post = new PostModel();
  post.content = req.body.content;
  await post.save();
  return res.status(201).json(post);
};

const router = Router();
router.get('/api/v1/posts', authenticateJwt, getAll);
router.post('/api/v1/posts', authenticateJwt, post);

export default router;
