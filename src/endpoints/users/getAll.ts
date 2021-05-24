import { Router } from 'express';
import { FilterQuery } from 'mongoose';
import { User, UserModel } from '../../db/models/user';
import { paginationApiResult } from '../../dtos/apiResult';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { AllowedSortQueryFieldName } from '../../utils/parseMongooseSortQuery';
import { getUserOrThrow, getPaginationOptions, getMongooseSortQuery } from '../../utils/requestHelpers';
import { hasRoles } from '../../utils/roleHelpers';
import { formatUserResponse } from './utils';

const allowedSortings: Array<AllowedSortQueryFieldName<User>> = [
  'id',
  'createdOn',
  'modifiedOn',
  'email',
  'displayName',
];

const getAll = asyncRequestHandler(async (req, res) => {
  const thisUser = getUserOrThrow(req);
  const sort = getMongooseSortQuery(req, allowedSortings);
  const query: FilterQuery<User> = hasRoles(thisUser, 'admin') ? {} : { _id: thisUser.id };
  const paginationResult = await UserModel.paginate(getPaginationOptions(req), query, undefined, { sort });
  const result = paginationResult.docs.map((doc) => formatUserResponse(doc.toObject()));
  return res.status(200).json(paginationApiResult(result, paginationResult));
});

export default Router().get('/api/v1/users', authenticateJwt, getAll);
