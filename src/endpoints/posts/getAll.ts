import { Router } from 'express';
import { PostModel } from '../../db/models/post';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';

const getAll = asyncRequestHandler(async (req, res) => {
  const queryResult = await PostModel.paginate(req.getPaginationOptions());
  return res.status(200).apiResult({ ...queryResult, result: queryResult.result.map((post) => post.toObject()) });
});

export default Router().get('/api/v1/posts', authenticateJwt, getAll);
