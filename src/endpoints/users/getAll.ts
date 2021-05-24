import { Router } from 'express';
import { FilterQuery } from 'mongoose';
import { User, UserModel } from '../../db/models/user';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { getUserOrThrow, getPaginationOptions } from '../../utils/requestHelpers';
import { hasRoles } from '../../utils/roleHelpers';
import { formatUserResponse } from './utils';

const getAll = asyncRequestHandler(async (req, res) => {
  const thisUser = getUserOrThrow(req);
  const query: FilterQuery<User> = hasRoles(thisUser, 'admin') ? {} : { _id: thisUser.id };
  const queryResult = await UserModel.paginate(getPaginationOptions(req), query);

  return res.status(200).apiResult({
    ...queryResult,
    result: queryResult.result.map((user) => formatUserResponse(user.toObject())),
  });
});

export default Router().get('/api/v1/users', authenticateJwt, getAll);
