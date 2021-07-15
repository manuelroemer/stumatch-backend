import { Router } from 'express';
import { PostModel } from '../../db/models/post';
import { apiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { NotFoundError } from '../../dtos/apiErrors';
import { CommentModel } from '../../db/models/comment';
import { CommentRequestBody, commentValidationSchema } from '../../endpointHelpers/comment';
import { getUserOrThrow } from '../../utils/requestHelpers';

const handler = asyncRequestHandler(async (req, res) => {
  const user = getUserOrThrow(req);
  const id = req.params.id;
  const body = req.body as CommentRequestBody;
  const post = await PostModel.findById(id);

  if (!post) {
    throw new NotFoundError();
  }
  const comment = new CommentModel({ authorId: user.id, postId: id, ...body });
  await comment.save();
  return res.status(201).json(apiResult(comment.toObject()));
});

export default Router().post(
  '/api/v1/posts/comments/:id',
  authenticateJwt,
  validateRequestBody(commentValidationSchema),
  handler,
);
