import { Router } from 'express';
import { CommentModel } from '../../db/models/comment';
import { NotFoundError } from '../../dtos/apiErrors';
import { apiResult } from '../../dtos/apiResults';
import { CommentRequestBody } from '../../endpointHelpers/comment';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';

const handler = asyncRequestHandler(async (req, res) => {
  const id = req.params.id;
  const body = req.body as CommentRequestBody;
  const comment = await CommentModel.findByIdAndUpdate(id, { content: body.content });
  if (!comment) {
    throw new NotFoundError();
  }

  return res.status(200).json(apiResult(comment.toObject()));
});

export default Router().put('/api/v1/posts/comments/:id', authenticateJwt, handler);
