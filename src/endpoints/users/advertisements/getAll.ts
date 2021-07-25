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
import { getEnrichedAdvertisementDto } from '../../../endpointHelpers/advertisement';

const sortableFields: Array<SortableFields<Advertisement>> = [
  'id',
  'createdOn',
  'modifiedOn',
  'authorId',
  'title',
  'content',
  'status',
];

const handler = asyncRequestHandler(async (req, res) => {
  const requestedUserId = getUserId(req);
  validateThisUserHasSomeIdOrSomeRole(req, requestedUserId, 'admin');

  const sort = getSortQueryFromUrl(req, sortableFields);
  const queryOptions: QueryOptions = { sort };
  const query = { authorId: requestedUserId };
  const paginationResult = await AdvertisementModel.paginate(
    getPaginationOptions(req),
    query as FilterQuery<Advertisement>,
    undefined,
    queryOptions,
  );
  const result = paginationResult.docs.map((doc) => doc.toObject());
  const apiResults = await Promise.all(result.map((advertisement) => getEnrichedAdvertisementDto(advertisement)));
  return res.status(200).json(paginationApiResult(apiResults, paginationResult));
});

export default Router().get('/api/v1/users/:id/advertisements', authenticateJwt, handler);
