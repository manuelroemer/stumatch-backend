import { Router } from 'express';
import { escapeRegExp } from 'lodash';
import { User, UserModel } from '../../db/models/user';
import { paginationApiResult } from '../../dtos/apiResults';
import { getEnrichedUserDto } from '../../endpointHelpers/user';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { SortableFields } from '../../utils/parseMongooseSortQuery';
import { getUserOrThrow, getPaginationOptions, getSortQueryFromUrl } from '../../utils/requestHelpers';
import { hasSomeRole } from '../../utils/roleHelpers';

const sortableFields: Array<SortableFields<User>> = ['id', 'createdOn', 'modifiedOn', 'email', 'firstName', 'lastName'];

const handler = asyncRequestHandler(async (req, res) => {
  const thisUser = getUserOrThrow(req);
  const sort = getSortQueryFromUrl(req, sortableFields);
  const filter = escapeRegExp(req.query.filter?.toString());

  let query;

  if (hasSomeRole(thisUser, 'admin')) {
    if (filter) {
      query = {
        $or: [{ firstName: { $regex: filter, $options: 'i' } }, { lastName: { $regex: filter, $options: 'i' } }],
      };
    } else {
      query = undefined;
    }
  } else {
    if (filter) {
      query = {
        searchForJobs: true,
        $or: [{ firstName: { $regex: filter, $options: 'i' } }, { lastName: { $regex: filter, $options: 'i' } }],
      };
    } else {
      query = { searchForjobs: true };
    }
  }

  const paginationResult = await UserModel.paginate(getPaginationOptions(req), query, undefined, { sort });
  const result = paginationResult.docs.map((doc) => getEnrichedUserDto(doc.toObject(), thisUser));
  return res.status(200).json(paginationApiResult(result, paginationResult));
});

export default Router().get('/api/v1/users', authenticateJwt, handler);
