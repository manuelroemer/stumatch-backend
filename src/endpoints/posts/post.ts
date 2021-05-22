import { Router } from 'express';
import { object, SchemaOf, string } from 'yup';
import { Post, PostModel } from '../../db/models/post';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';

const schema: SchemaOf<Post> = object({
  content: string().required(),
}).defined();

const post = asyncRequestHandler(async (req, res) => {
  const body = req.body as Post;
  const post = new PostModel(body);
  await post.save();
  return res.status(201).json(post);
});

export default Router().post('/api/v1/posts', authenticateJwt, validateRequestBody(schema), post);
