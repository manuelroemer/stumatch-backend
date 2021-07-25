import { Router } from 'express';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { LikeModel } from '../../db/models/like';

const handler = asyncRequestHandler(async (req, res) => {
  const id = req.params.id;
  const like = await LikeModel.findById(id);
  if (!like) {
    return res.sendStatus(204);
  }

  await like.delete();
  return res.sendStatus(204);
});

export default Router().delete('/api/v1/posts/likes/:id', authenticateJwt, handler);
