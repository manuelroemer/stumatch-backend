import { Router } from 'express';
import { NotFoundError } from '../../dtos/apiErrors';
import { apiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { validateBodyIdMatchesPathId } from '../../middlewares/validateBodyIdMatchesPathId';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { object, boolean, string, SchemaOf } from 'yup';
import { NotificationModel } from '../../db/models/notification';
import { validateThisUserHasIdOrRole } from '../../utils/roleHelpers';

interface RequestBody {
  id?: string;
  seen: boolean;
}

const schema: SchemaOf<RequestBody> = object({
  id: string().uuid(),
  seen: boolean().required(),
}).defined();

const handler = asyncRequestHandler(async (req, res) => {
  const body = req.body as RequestBody;
  const id = req.params.id;
  const notification = await NotificationModel.findById(id);

  if (!notification) {
    throw new NotFoundError();
  }

  validateThisUserHasIdOrRole(req, notification.userId, 'admin');
  Object.assign(notification, body);
  await notification.save();

  return res.status(200).json(apiResult(notification.toObject()));
});

export default Router().put(
  '/api/v1/notifications/:id',
  authenticateJwt,
  validateRequestBody(schema),
  validateBodyIdMatchesPathId(),
  handler,
);
