import { Router } from 'express';
import { AdvertisementModel } from '../../db/models/advertisement';
import { apiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';

const handler = asyncRequestHandler(async (req, res) => {
  const now = new Date();
  const query = { status: 'verified', startDate: { $lte: now }, endDate: { $gte: now } };

  const aggregationResult = await AdvertisementModel.aggregate().match(query).sample(1);
  return !aggregationResult ? res.status(200).json(undefined) : res.status(200).json(aggregationResult[0]);
});

export default Router().get('/api/v1/feedAdvertisements/random', authenticateJwt, handler);
