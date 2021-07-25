import { Router } from 'express';
import { NotFoundError } from '../../dtos/apiErrors';
import { apiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { validateBodyIdMatchesPathId } from '../../middlewares/validateBodyIdMatchesPathId';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { object, string, SchemaOf, date } from 'yup';
import { validateThisUserHasSomeIdOrSomeRole, validateThisUserHasSomeRole } from '../../utils/roleHelpers';
import { Advertisement, AdvertisementModel } from '../../db/models/advertisement';
import { createBlobFromString } from '../../endpointHelpers/blob';

interface RequestBody {
  id?: string;
  authorId?: string;
  title?: string;
  shortDescription?: string;
  content?: string;
  facultyId?: string;
  studyProgramid?: string;
  startDate?: Date;
  endDate?: Date;
  advertisementImageBlob?: string;
  status?: string;
}

const schema = object({
  id: string().uuid(),
  authorId: string(),
  title: string(),
  shortDescription: string(),
  content: string(),
  startDate: date(),
  endDate: date(),
  advertisementImageBlob: string(),
  status: string().oneOf(['unverified', 'pendingVerification', 'verified', 'denied']),
}).defined();

const handler = asyncRequestHandler(async (req, res) => {
  const body = req.body as RequestBody;
  const id = req.params.id;
  const advertisementImageBlob = body.advertisementImageBlob
    ? await createBlobFromString(body.advertisementImageBlob, 'base64')
    : undefined;
  const advertisement = await AdvertisementModel.findById(id);

  if (!advertisement) {
    throw new NotFoundError();
  }

  if (req.body.status !== undefined) {
    validateThisUserHasSomeRole(req, 'admin');
  } else {
    validateThisUserHasSomeIdOrSomeRole(req, advertisement.authorId, 'admin');
    body.status = 'pendingVerification';
  }
  if (advertisementImageBlob) {
    advertisement.advertisementImageBlobId = advertisementImageBlob?.id;
  }
  Object.assign(advertisement, body);
  await advertisement.save();

  return res.status(200).json(apiResult(advertisement.toObject()));
});

export default Router().put(
  '/api/v1/advertisements/:id',
  authenticateJwt,
  validateRequestBody(schema),
  validateBodyIdMatchesPathId(),
  handler,
);
