import { Router } from 'express';
import { UserModel } from '../../db/models/user';
import { NotFoundError } from '../../dtos/apiErrors';
import { apiResult } from '../../dtos/apiResults';
import { getEnrichedUserDto } from '../../endpointHelpers/user';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { getUserId, getUserOrThrow } from '../../utils/requestHelpers';

const handler = asyncRequestHandler(async (req, res) => {
  const thisUser = getUserOrThrow(req);
  const requestedUserId = getUserId(req);
  const user = await UserModel.findById(requestedUserId);

  if (!user) {
    throw new NotFoundError();
  }

  const result = getEnrichedUserDto(user.toObject(), thisUser);
  return res.status(200).json(apiResult(result));
});

export default Router().get('/api/v1/users/:id', authenticateJwt, handler);
