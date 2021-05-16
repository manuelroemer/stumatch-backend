import { RequestHandler, Router } from 'express';
import { PostModel } from '../db/models/post';

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

export default Router().get('/posts', getAll).post('/posts', post);
