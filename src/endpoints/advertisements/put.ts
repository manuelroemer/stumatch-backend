import { Router } from 'express';
import { NotFoundError } from '../../dtos/apiErrors';
import { apiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { validateBodyIdMatchesPathId } from '../../middlewares/validateBodyIdMatchesPathId';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { object, string, SchemaOf } from 'yup';
import { validateThisUserHasSomeIdOrSomeRole, validateThisUserHasSomeRole } from '../../utils/roleHelpers';
import { AdvertisementModel } from '../../db/models/advertisement';

interface RequestBody {
  id?: string;
  status?: string;
  title?: string;
  content?: string;
}

const schema: SchemaOf<RequestBody> = object({
  id: string().uuid(),
  status: string().oneOf(['unverified', 'pendingVerification', 'verified', 'denied']),
  title: string(),
  content: string(),
}).defined();

const handler = asyncRequestHandler(async (req, res) => {
  const body = req.body as RequestBody;
  const id = req.params.id;
  const advertisement = await AdvertisementModel.findById(id);

  if (!advertisement) {
    throw new NotFoundError();
  }

  if (req.body.status !== undefined) {
    validateThisUserHasSomeRole(req, 'admin');
  } else {
    validateThisUserHasSomeIdOrSomeRole(req, advertisement.userId, 'admin');
    req.body.status = 'unverified';
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
