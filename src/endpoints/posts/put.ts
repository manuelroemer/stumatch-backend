import { Router } from 'express';
import { PostModel } from '../../db/models/post';
import { NotFoundError } from '../../errors/apiErrors';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { validateBodyIdMatchesPathId } from '../../middlewares/validateBodyIdMatchesPathId';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { PostRequestBody, postValidationSchema } from './utils';

const patch = asyncRequestHandler(async (req, res) => {
  const body = req.body as PostRequestBody;
  const id = req.params.id;
  const updatedPost = await PostModel.findByIdAndUpdate(id, body, { new: true });

  if (!updatedPost) {
    throw new NotFoundError();
  }

  return res.status(200).apiResult({ result: updatedPost.toObject() });
});

export default Router().patch(
  '/api/v1/posts/:id',
  authenticateJwt,
  validateRequestBody(postValidationSchema),
  validateBodyIdMatchesPathId(),
  patch,
);
