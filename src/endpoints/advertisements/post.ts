import { Router } from 'express';
import { object, string } from 'yup';
import { Advertisement, AdvertisementModel } from '../../db/models/advertisement';
import { UserModel } from '../../db/models/user';
import { NotFoundError } from '../../dtos/apiErrors';
import { apiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { validateThisUserHasSomeRole } from '../../utils/roleHelpers';

const schema = object({
  id: string().uuid(),
  userId: string().uuid().required(),
  title: string().required(),
  content: string().required(),
}).defined();

const handler = asyncRequestHandler(async (req, res) => {
  validateThisUserHasSomeRole(req, ['advertiser', 'admin']);
  const body = req.body as Advertisement;

  const user = await UserModel.findById(body.userId);
  if (!user) {
    throw new NotFoundError();
  }

  const advertisement = new AdvertisementModel({ _id: body.id, ...body });
  await advertisement.save();
  return res.status(201).json(apiResult(advertisement.toObject()));
});

export default Router().post('/api/v1/advertisements', authenticateJwt, validateRequestBody(schema), handler);
