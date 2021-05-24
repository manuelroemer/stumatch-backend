import { Router } from 'express';
import { QueryOptions } from 'mongoose';
import { FilterQuery } from 'mongoose';
import { NotificationModel } from '../../../db/models/notification';
import { authenticateJwt } from '../../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../../utils/asyncRequestHandler';
import { getMongooseSortQuery, getPaginationOptions, getUserId } from '../../../utils/requestHelpers';
import { validateThisUserHasIdOrRoles } from '../../../utils/roleHelpers';
import { AllowedSortQueryFieldName } from '../../../utils/parseMongooseSortQuery';
import { Notification } from '../../../db/models/notification';

const allowedSortings: Array<AllowedSortQueryFieldName<Notification>> = [
  'id',
  'createdOn',
  'modifiedOn',
  'seen',
  'title',
  'content',
];

const get = asyncRequestHandler(async (req, res) => {
  const requestedUserId = getUserId(req);
  validateThisUserHasIdOrRoles(req, requestedUserId, 'admin');

  const sort = getMongooseSortQuery(req, allowedSortings);
  const query: FilterQuery<Notification> = { userId: requestedUserId };
  const queryOptions: QueryOptions = { sort };
  const queryResult = await NotificationModel.paginate(getPaginationOptions(req), query, undefined, queryOptions);
  return res.status(200).apiResult({
    ...queryResult,
    result: queryResult.result.map((notification) => notification.toObject()),
  });
});

export default Router().get('/api/v1/users/:id/notifications', authenticateJwt, get);
