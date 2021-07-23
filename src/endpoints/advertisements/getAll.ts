import { Router } from 'express';
import { QueryOptions } from 'mongoose';
import { Advertisement, AdvertisementModel } from '../../db/models/advertisement';
import { paginationApiResult } from '../../dtos/apiResults';
import { getEnrichedAdvertisementDto } from '../../endpointHelpers/advertisement';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { SortableFields } from '../../utils/parseMongooseSortQuery';
import { getPaginationOptions, getSortQueryFromUrl } from '../../utils/requestHelpers';
import { validateThisUserHasSomeRole } from '../../utils/roleHelpers';

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
  validateThisUserHasSomeRole(req, 'admin');
  const sort = getSortQueryFromUrl(req, sortableFields);
  const queryOptions: QueryOptions = { sort };
  const filter = req.query.filter?.toString();
  const query = filter ? { status: filter as any } : undefined;
  const paginationResult = await AdvertisementModel.paginate(getPaginationOptions(req), query, undefined, queryOptions);
  const result = paginationResult.docs.map((doc) => doc.toObject());
  const apiResults = await Promise.all(result.map((advertisement) => getEnrichedAdvertisementDto(advertisement)));
  return res.status(200).json(paginationApiResult(apiResults, paginationResult));
});

export default Router().get('/api/v1/advertisements', authenticateJwt, handler);
