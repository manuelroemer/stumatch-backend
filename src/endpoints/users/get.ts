import { Router } from 'express';
import { UserModel } from '../../db/models/user';
import { NotFoundError } from '../../dtos/apiErrors';
import { apiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { getUserId } from '../../utils/requestHelpers';
import { validateThisUserHasIdOrRole } from '../../utils/roleHelpers';
import { formatUserResponse } from './utils';

const handler = asyncRequestHandler(async (req, res) => {
  const requestedUserId = getUserId(req);
  validateThisUserHasIdOrRole(req, requestedUserId, 'admin');

  const user = await UserModel.findById(requestedUserId);
  if (!user) {
    throw new NotFoundError();
  }

  const result = formatUserResponse(user.toObject());
  return res.status(200).json(apiResult(result));
});

export default Router().get('/api/v1/users/:id', authenticateJwt, handler);
