import { Router } from 'express';
import { QueryOptions } from 'mongoose';
import { FilterQuery } from 'mongoose';
import { AdvertisementModel } from '../../../db/models/advertisement';
import { authenticateJwt } from '../../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../../utils/asyncRequestHandler';
import { getSortQueryFromUrl, getPaginationOptions, getUserId } from '../../../utils/requestHelpers';
import { validateThisUserHasSomeIdOrSomeRole } from '../../../utils/roleHelpers';
import { SortableFields } from '../../../utils/parseMongooseSortQuery';
import { Advertisement } from '../../../db/models/advertisement';
import { paginationApiResult } from '../../../dtos/apiResults';

const sortableFields: Array<SortableFields<Advertisement>> = [
  'id',
  'createdOn',
  'modifiedOn',
  'userId',
  'title',
  'content',
  'status',
];

const handler = asyncRequestHandler(async (req, res) => {
  const requestedUserId = getUserId(req);
  validateThisUserHasSomeIdOrSomeRole(req, requestedUserId, 'admin');

  const sort = getSortQueryFromUrl(req, sortableFields);
  const query: FilterQuery<Advertisement> = { userId: requestedUserId };
  const queryOptions: QueryOptions = { sort };
  const paginationResult = await AdvertisementModel.paginate(getPaginationOptions(req), query, undefined, queryOptions);
  const result = paginationResult.docs.map((doc) => doc.toObject());
  return res.status(200).json(paginationApiResult(result, paginationResult));
});

export default Router().get('/api/v1/users/:id/advertisements', authenticateJwt, handler);
