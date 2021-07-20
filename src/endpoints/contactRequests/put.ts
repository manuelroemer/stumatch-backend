import { Router } from 'express';
import { object, string } from 'yup';
import { ContactRequestModel } from '../../db/models/contactRequest';
import { NotFoundError } from '../../dtos/apiErrors';
import { apiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { validateBodyIdMatchesPathId } from '../../middlewares/validateBodyIdMatchesPathId';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { validateThisUserHasSomeRole } from '../../utils/roleHelpers';

export interface ContactRequestPutBody {
  id?: string;
  status: 'open' | 'inProgress' | 'closed';
}

const schema = object({
  id: string().uuid(),
  status: string().oneOf(['open', 'inProgress', 'closed']).required(),
}).defined();

const handler = asyncRequestHandler(async (req, res) => {
  const body = req.body as ContactRequestPutBody;
  const id = req.params.id;
  const contactRequest = await ContactRequestModel.findById(id);
  if (!contactRequest) {
    throw new NotFoundError();
  }

  validateThisUserHasSomeRole(req, 'admin');

  contactRequest.status = body.status;

  await contactRequest.save();
  return res.status(200).json(apiResult(await contactRequest.toObject()));
});

export default Router().put(
  '/api/v1/contactRequests/:id',
  authenticateJwt,
  validateRequestBody(schema),
  validateBodyIdMatchesPathId(),
  handler,
);
