import { Router } from 'express';
import { PostModel } from '../../db/models/post';
import { apiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { getUserOrThrow } from '../../utils/requestHelpers';
import { NotFoundError } from '../../dtos/apiErrors';
import { LikeModel } from '../../db/models/like';
import { likeValidationSchema } from '../../endpointHelpers/like';

const handler = asyncRequestHandler(async (req, res) => {
  const user = getUserOrThrow(req);
  const id = req.body.postId;
  const post = await PostModel.findById(id);
  if (!post) {
    throw new NotFoundError();
  }

  const likeExists = await LikeModel.findOne({ postId: post.id, userId: user.id });
  if (likeExists) {
    // Since likes are essentially singletons we can be idempontent here and return the single existing
    // like per user instead of throwing a conflict error.
    return res.status(201).json(apiResult(likeExists.toObject()));
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
