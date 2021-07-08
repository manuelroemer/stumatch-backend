import { Router } from 'express';
import { PostModel } from '../../db/models/post';
import { apiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { PostRequestBody, postValidationSchema } from './utils';
import { getUserOrThrow } from '../../utils/requestHelpers';

const handler = asyncRequestHandler(async (req, res) => {
  const user = getUserOrThrow(req);
  const body = req.body as PostRequestBody;
  const post = new PostModel({ _id: body.id, authorId: user.id, ...body });
  await post.save();
  return res.status(201).json(apiResult(post.toObject()));
});

export default Router().post('/api/v1/posts', authenticateJwt, validateRequestBody(postValidationSchema), handler);
