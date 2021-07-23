import { Router } from 'express';
import { User, UserModel } from '../../db/models/user';
import { paginationApiResult } from '../../dtos/apiResults';
import { getEnrichedUserDto } from '../../endpointHelpers/user';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { SortableFields } from '../../utils/parseMongooseSortQuery';
import { getUserOrThrow, getPaginationOptions, getSortQueryFromUrl } from '../../utils/requestHelpers';

const sortableFields: Array<SortableFields<User>> = ['id', 'createdOn', 'modifiedOn', 'email', 'firstName', 'lastName'];

const handler = asyncRequestHandler(async (req, res) => {
  const thisUser = getUserOrThrow(req);
  const sort = getSortQueryFromUrl(req, sortableFields);
  const filter = req.query.filter?.toString();

  const query = filter
    ? { $or: [{ firstName: { $regex: filter, $options: 'i' } }, { lastName: { $regex: filter, $options: 'i' } }] }
    : undefined;

  const paginationResult = await UserModel.paginate(getPaginationOptions(req), query, undefined, { sort });
  const result = paginationResult.docs.map((doc) => getEnrichedUserDto(doc.toObject(), thisUser));
  return res.status(200).json(paginationApiResult(result, paginationResult));
});

export default Router().get('/api/v1/users', authenticateJwt, handler);
