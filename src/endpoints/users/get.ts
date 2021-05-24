import { Router } from 'express';
import { UserModel } from '../../db/models/user';
import { NotFoundError } from '../../errors/apiErrors';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { getUserId } from '../../utils/requestHelpers';
import { validateThisUserHasIdOrRoles } from '../../utils/roleHelpers';
import { formatUserResponse } from './utils';

const get = asyncRequestHandler(async (req, res) => {
  const requestedUserId = getUserId(req);
  validateThisUserHasIdOrRoles(req, requestedUserId, 'admin');

  const user = await UserModel.findById(requestedUserId);
  if (!user) {
    throw new NotFoundError();
  }

  return res.status(200).apiResult({ result: formatUserResponse(user.toObject()) });
});

export default Router().get('/api/v1/users/:id', authenticateJwt, get);
