import { Router } from 'express';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { NotFoundError } from '../../dtos/apiErrors';
import { CommentModel } from '../../db/models/comment';
import { validateThisUserHasSomeIdOrSomeRole } from '../../utils/roleHelpers';

const handler = asyncRequestHandler(async (req, res) => {
  const id = req.params.id;
  const comment = await CommentModel.findById(id);
  if (!comment) {
    throw new NotFoundError();
  }

  validateThisUserHasSomeIdOrSomeRole(req, comment.authorId, 'admin');

  await comment.delete();

  return res.sendStatus(204);
});

export default Router().delete('/api/v1/posts/comments/:id', authenticateJwt, handler);
