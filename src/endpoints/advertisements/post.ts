import { Router } from 'express';
import { object, string, date } from 'yup';
import { Advertisement, AdvertisementModel } from '../../db/models/advertisement';
import { UserModel } from '../../db/models/user';
import { NotFoundError } from '../../dtos/apiErrors';
import { apiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { validateThisUserHasSomeRole } from '../../utils/roleHelpers';
import { createBlobFromString } from '../../endpointHelpers/blob';
import { AdvertisementPostBody } from '../../endpointHelpers/advertisement';

const schema = object({
  id: string().uuid(),
  authorId: string().uuid().required(),
  title: string().required(),
  shortDescription: string().required(),
  content: string().required(),
  facultyId: string(),
  studyProgramId: string(),
  startDate: date().required(),
  endDate: date().required(),
  advertisementImageBlob: string(),
}).defined();

const handler = asyncRequestHandler(async (req, res) => {
  validateThisUserHasSomeRole(req, ['advertiser', 'admin']);
  const body = req.body as AdvertisementPostBody;
  const advertisementImageBlob = body.advertisementImageBlob
    ? await createBlobFromString(body.advertisementImageBlob, 'base64')
    : undefined;

  const user = await UserModel.findById(body.authorId);
  if (!user) {
    throw new NotFoundError();
  }

  const advertisement = new AdvertisementModel({
    _id: body.id,
    advertisementImageBlobId: advertisementImageBlob?.id,
    ...body,
  });
  await advertisement.save();
  return res.status(201).json(apiResult(advertisement.toObject()));
});

export default Router().post('/api/v1/advertisements', authenticateJwt, validateRequestBody(schema), handler);
