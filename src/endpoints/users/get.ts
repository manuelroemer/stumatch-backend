import { Router } from 'express';
import { User, UserModel } from '../../db/models/user';
import { ForbiddenError, NotFoundError } from '../../errors/apiErrors';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';

const get = asyncRequestHandler(async (req, res) => {
  const thisUserId = req.user!.id;
  const requestedId = req.params.id === 'me' ? thisUserId : req.params.id;

  if (thisUserId !== requestedId) {
    throw new ForbiddenError();
  }

  const user = await UserModel.findById(requestedId);
  if (!user) {
    throw new NotFoundError();
  }

  // User contains sensitive data not intended for API consumers.
  const result: Partial<User> = user.toObject();
  delete result.passwordHash;

  return res.status(200).apiResult({ result });
});

export default Router().get('/api/v1/users/:id', authenticateJwt, get);
