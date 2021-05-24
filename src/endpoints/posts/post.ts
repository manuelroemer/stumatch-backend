import { Router } from 'express';
import { PostModel } from '../../db/models/post';
import { apiResult } from '../../dtos/apiResult';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { PostRequestBody, postValidationSchema } from './utils';

const post = asyncRequestHandler(async (req, res) => {
  const body = req.body as PostRequestBody;
  const post = new PostModel({ _id: body.id, ...body });
  await post.save();
  return res.status(201).json(apiResult(post.toObject()));
});

export default Router().post('/api/v1/posts', authenticateJwt, validateRequestBody(postValidationSchema), post);
