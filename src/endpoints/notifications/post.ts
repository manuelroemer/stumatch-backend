import { Router } from 'express';
import { object, string } from 'yup';
import { Notification, NotificationModel } from '../../db/models/notification';
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
  type: string().oneOf(['text', 'foo']).required(),
  title: string().when('type', { is: 'text', then: string().required() }),
  content: string().when('type', { is: 'text', then: string().required() }),
}).defined();

const handler = asyncRequestHandler(async (req, res) => {
  validateThisUserHasSomeRole(req, 'admin');
  const body = req.body as Notification;

  const user = await UserModel.findById(body.userId);
  if (!user) {
    throw new NotFoundError();
  }

  const notification = new NotificationModel({ _id: body.id, ...body });
  await notification.save();
  return res.status(201).json(apiResult(notification.toObject()));
});

export default Router().post('/api/v1/notifications', authenticateJwt, validateRequestBody(schema), handler);
