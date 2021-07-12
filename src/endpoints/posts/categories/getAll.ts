import { Router } from 'express';
import { PostModel } from '../../../db/models/post';
import { apiResult } from '../../../dtos/apiResults';
import { authenticateJwt } from '../../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../../utils/asyncRequestHandler';

const handler = asyncRequestHandler(async (req, res) => {
  const queryResult = await PostModel.find().distinct('category');

  return res.status(200).json(apiResult(queryResult));
});

export default Router().get('/api/v1/categories', authenticateJwt, handler);
