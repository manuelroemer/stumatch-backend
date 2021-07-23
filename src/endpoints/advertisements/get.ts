import { Router } from 'express';
import { AdvertisementModel } from '../../db/models/advertisement';
import { NotFoundError } from '../../dtos/apiErrors';
import { apiResult } from '../../dtos/apiResults';
import { getEnrichedAdvertisementDto } from '../../endpointHelpers/advertisement';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';

const handler = asyncRequestHandler(async (req, res) => {
  const id = req.params.id;
  const advertisement = await AdvertisementModel.findById(id);
  if (!advertisement) {
    throw new NotFoundError();
  }

  return res.status(200).json(apiResult(await getEnrichedAdvertisementDto(advertisement.toObject())));
});

export default Router().get('/api/v1/advertisements/:id', authenticateJwt, handler);
