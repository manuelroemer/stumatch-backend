import { Router } from 'express';
import { PostModel } from '../../db/models/post';
import { NotFoundError } from '../../dtos/apiErrors';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';

const handler = asyncRequestHandler(async (req, res) => {
  const id = req.params.id;
  const post = await PostModel.findByIdAndDelete(id);
  if (!post) {
    throw new NotFoundError();
  }

  return res.sendStatus(204);
});

export default Router().delete('/api/v1/posts/:id', authenticateJwt, handler);
