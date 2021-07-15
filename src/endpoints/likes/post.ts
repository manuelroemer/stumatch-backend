import { Router } from 'express';
import { PostModel } from '../../db/models/post';
import { apiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { getUserOrThrow } from '../../utils/requestHelpers';
import { ForbiddenError, NotFoundError } from '../../dtos/apiErrors';
import { LikeModel } from '../../db/models/like';
import { likeValidationSchema } from '../../endpointHelpers/like';

const handler = asyncRequestHandler(async (req, res) => {
  const user = getUserOrThrow(req);
  const id = req.body.postId;
  const post = await PostModel.findById(id);

  if (!post) {
    throw new NotFoundError();
  }
  const likeExists = await LikeModel.find({ postId: post.id, userId: user.id });
  if (likeExists.length > 0) {
    throw new ForbiddenError();
  }
  const like = new LikeModel({ postId: post.id, userId: user.id });
  await like.save();
  return res.status(201).json(apiResult(like.toObject()));
});

export default Router().post(
  '/api/v1/posts/likes',
  authenticateJwt,
  validateRequestBody(likeValidationSchema),
  handler,
);
