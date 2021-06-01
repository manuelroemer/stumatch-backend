import { Router } from 'express';
import { NotificationModel } from '../../db/models/notification';
import { NotFoundError } from '../../dtos/apiErrors';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { validateThisUserHasIdOrRole } from '../../utils/roleHelpers';

const handler = asyncRequestHandler(async (req, res) => {
  const id = req.params.id;
  const notification = await NotificationModel.findById(id);

  if (!notification) {
    throw new NotFoundError();
  }

  validateThisUserHasIdOrRole(req, notification.userId, 'admin');
  await notification.delete();

  return res.sendStatus(204);
});

export default Router().delete('/api/v1/notifications/:id', authenticateJwt, handler);
