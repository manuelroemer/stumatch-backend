import { Router } from 'express';
import { QueryOptions } from 'mongoose';
import { FilterQuery } from 'mongoose';
import { NotificationModel } from '../../../db/models/notification';
import { authenticateJwt } from '../../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../../utils/asyncRequestHandler';
import { getSortQueryFromUrl, getPaginationOptions, getUserId } from '../../../utils/requestHelpers';
import { validateThisUserHasIdOrRole } from '../../../utils/roleHelpers';
import { SortableFields } from '../../../utils/parseMongooseSortQuery';
import { Notification } from '../../../db/models/notification';
import { paginationApiResult } from '../../../dtos/apiResults';

const sortableFields: Array<SortableFields<Notification>> = [
  'id',
  'createdOn',
  'modifiedOn',
  'seen',
  'title',
  'content',
];

const handler = asyncRequestHandler(async (req, res) => {
  const requestedUserId = getUserId(req);
  validateThisUserHasIdOrRole(req, requestedUserId, 'admin');

  const sort = getSortQueryFromUrl(req, sortableFields);
  const query: FilterQuery<Notification> = { userId: requestedUserId };
  const queryOptions: QueryOptions = { sort };
  const paginationResult = await NotificationModel.paginate(getPaginationOptions(req), query, undefined, queryOptions);
  const result = paginationResult.docs.map((doc) => doc.toObject());
  return res.status(200).json(paginationApiResult(result, paginationResult));
});

export default Router().get('/api/v1/users/:id/notifications', authenticateJwt, handler);
