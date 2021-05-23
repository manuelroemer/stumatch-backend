import { Router } from 'express';
import { FilterQuery } from 'mongoose';
import { User, UserModel } from '../../db/models/user';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { hasRoles } from '../../utils/roles';
import { formatUserResponse } from './utils';

const getAll = asyncRequestHandler(async (req, res) => {
  const thisUser = req.getUserOrThrow();
  const query: FilterQuery<User> = hasRoles(thisUser, 'admin') ? {} : { _id: thisUser.id };
  const users = await UserModel.find(query);
  return res.status(200).apiResult({ result: users.map((user) => formatUserResponse(user.toObject())) });
});

export default Router().get('/api/v1/users', authenticateJwt, getAll);
