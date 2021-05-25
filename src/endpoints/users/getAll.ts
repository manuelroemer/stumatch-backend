import { Router } from 'express';
import { FilterQuery } from 'mongoose';
import { User, UserModel } from '../../db/models/user';
import { paginationApiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { SortableFields } from '../../utils/parseMongooseSortQuery';
import { getUserOrThrow, getPaginationOptions, getSortQueryFromUrl } from '../../utils/requestHelpers';
import { hasRoles } from '../../utils/roleHelpers';
import { formatUserResponse } from './utils';

const sortableFields: Array<SortableFields<User>> = ['id', 'createdOn', 'modifiedOn', 'email', 'displayName'];

const handler = asyncRequestHandler(async (req, res) => {
  const thisUser = getUserOrThrow(req);
  const sort = getSortQueryFromUrl(req, sortableFields);
  const query: FilterQuery<User> = hasRoles(thisUser, 'admin') ? {} : { _id: thisUser.id };
  const paginationResult = await UserModel.paginate(getPaginationOptions(req), query, undefined, { sort });
  const result = paginationResult.docs.map((doc) => formatUserResponse(doc.toObject()));
  return res.status(200).json(paginationApiResult(result, paginationResult));
});

export default Router().get('/api/v1/users', authenticateJwt, handler);
