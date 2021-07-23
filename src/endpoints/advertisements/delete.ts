import { Router } from 'express';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { validateThisUserHasSomeIdOrSomeRole } from '../../utils/roleHelpers';
import { AdvertisementModel } from '../../db/models/advertisement';
import { NotFoundError } from '../../dtos/apiErrors';

const handler = asyncRequestHandler(async (req, res) => {
  const id = req.params.id;
  const advertisement = await AdvertisementModel.findById(id);

  if (!advertisement) {
    throw new NotFoundError();
  }

  validateThisUserHasSomeIdOrSomeRole(req, advertisement.authorId, 'admin');
  await advertisement.delete();

  return res.sendStatus(204);
});

export default Router().delete('/api/v1/advertisements/:id', authenticateJwt, handler);
