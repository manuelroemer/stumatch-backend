import { Router } from 'express';
import { User, UserModel } from '../../db/models/user';
import { paginationApiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { SortableFields } from '../../utils/parseMongooseSortQuery';
import { getUserOrThrow, getPaginationOptions, getSortQueryFromUrl } from '../../utils/requestHelpers';
import { trimPrivateUserProfileInfo } from './utils';

const sortableFields: Array<SortableFields<User>> = ['id', 'createdOn', 'modifiedOn', 'email', 'firstName', 'lastName'];

const handler = asyncRequestHandler(async (req, res) => {
  const thisUser = getUserOrThrow(req);
  const sort = getSortQueryFromUrl(req, sortableFields);
  const paginationResult = await UserModel.paginate(getPaginationOptions(req), {}, undefined, { sort });
  const result = paginationResult.docs.map((doc) => trimPrivateUserProfileInfo(doc.toObject(), thisUser));
  return res.status(200).json(paginationApiResult(result, paginationResult));
});

export default Router().get('/api/v1/users', authenticateJwt, handler);
