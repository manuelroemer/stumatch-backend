import { Router } from 'express';
import { NotificationModel } from '../../../db/models/notification';
import { authenticateJwt } from '../../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../../utils/asyncRequestHandler';
import { getPaginationOptions, getUserId } from '../../../utils/requestHelpers';
import { validateThisUserHasIdOrRoles } from '../../../utils/roleHelpers';

const get = asyncRequestHandler(async (req, res) => {
  const requestedUserId = getUserId(req);
  validateThisUserHasIdOrRoles(req, requestedUserId, 'admin');

  const queryResult = await NotificationModel.paginate(getPaginationOptions(req), { userId: requestedUserId });
  return res.status(200).apiResult({
    ...queryResult,
    result: queryResult.result.map((notification) => notification.toObject()),
  });
});

export default Router().get('/api/v1/users/:id/notifications', authenticateJwt, get);
