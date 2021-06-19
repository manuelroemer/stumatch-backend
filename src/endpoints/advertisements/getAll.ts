import { Router } from 'express';
import { QueryOptions } from 'mongoose';
import { Advertisement, AdvertisementModel } from '../../db/models/advertisement';
import { paginationApiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { SortableFields } from '../../utils/parseMongooseSortQuery';
import { getUserOrThrow, getPaginationOptions, getSortQueryFromUrl } from '../../utils/requestHelpers';
import { validateThisUserHasSomeRole } from '../../utils/roleHelpers';

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
  validateThisUserHasSomeRole(req, 'admin');
  const sort = getSortQueryFromUrl(req, sortableFields);
  const queryOptions: QueryOptions = { sort };
  const paginationResult = await AdvertisementModel.paginate(getPaginationOptions(req), {}, undefined,queryOptions);
  const result = paginationResult.docs.map((doc) => doc.toObject());
  return res.status(200).json(paginationApiResult(result, paginationResult));
});

export default Router().get('/api/v1/advertisements', authenticateJwt, handler);
