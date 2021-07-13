import { Router } from 'express';
import { AdvertisementModel } from '../../db/models/advertisement';
import { apiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';

const handler = asyncRequestHandler(async (req, res) => {
  const query = { status: 'verified' };
  const ad = await AdvertisementModel.aggregate().match(query).sample(1);
  return res.status(200).json(ad);
});

export default Router().get('/api/v1/feedAdvertisements/random', authenticateJwt, handler);
