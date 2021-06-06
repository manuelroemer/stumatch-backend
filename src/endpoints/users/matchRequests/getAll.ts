import { Router } from 'express';
import { QueryOptions } from 'mongoose';
import { FilterQuery } from 'mongoose';
import { authenticateJwt } from '../../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../../utils/asyncRequestHandler';
import { getSortQueryFromUrl, getPaginationOptions, getUserId } from '../../../utils/requestHelpers';
import { validateThisUserHasSomeIdOrSomeRole } from '../../../utils/roleHelpers';
import { SortableFields } from '../../../utils/parseMongooseSortQuery';
import { paginationApiResult } from '../../../dtos/apiResults';
import { MatchRequest, MatchRequestModel } from '../../../db/models/matchRequest';

const sortableFields: Array<SortableFields<MatchRequest>> = ['createdOn', 'modifiedOn'];

const handler = asyncRequestHandler(async (req, res) => {
  const requestedUserId = getUserId(req);
  validateThisUserHasSomeIdOrSomeRole(req, requestedUserId, 'admin');

  const sort = getSortQueryFromUrl(req, sortableFields);
  const query: FilterQuery<MatchRequest> = { userId: requestedUserId };
  const queryOptions: QueryOptions = { sort };
  const paginationResult = await MatchRequestModel.paginate(getPaginationOptions(req), query, undefined, queryOptions);
  const result = paginationResult.docs.map((doc) => doc.toObject());
  return res.status(200).json(paginationApiResult(result, paginationResult));
});

export default Router().get('/api/v1/users/:id/matchRequests', authenticateJwt, handler);
