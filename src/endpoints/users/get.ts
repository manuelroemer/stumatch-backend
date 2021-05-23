import { Router } from 'express';
import { UserModel } from '../../db/models/user';
import { ForbiddenError, NotFoundError } from '../../errors/apiErrors';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { hasRoles } from '../../utils/roles';
import { formatUserResponse } from './utils';

const get = asyncRequestHandler(async (req, res) => {
  const thisUser = req.getUserOrThrow();
  const requestedId = req.params.id === 'me' ? thisUser.id : req.params.id;

  if (thisUser.id !== requestedId && !hasRoles(thisUser, 'admin')) {
    throw new ForbiddenError();
  }

  const user = await UserModel.findById(requestedId);
  if (!user) {
    throw new NotFoundError();
  }

  return res.status(200).apiResult({ result: formatUserResponse(user.toObject()) });
});

export default Router().get('/api/v1/users/:id', authenticateJwt, get);
