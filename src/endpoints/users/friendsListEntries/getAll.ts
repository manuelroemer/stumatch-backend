import { Router } from 'express';
import { FilterQuery } from 'mongoose';
import { authenticateJwt } from '../../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../../utils/asyncRequestHandler';
import { getPaginationOptions, getUserId } from '../../../utils/requestHelpers';
import { validateThisUserHasIdOrRoles } from '../../../utils/roleHelpers';
import { Notification } from '../../../db/models/notification';
import { paginationApiResult } from '../../../dtos/apiResults';
import { FriendsListEntryModel } from '../../../db/models/friendsListEntry';

const handler = asyncRequestHandler(async (req, res) => {
  const requestedUserId = getUserId(req);
  validateThisUserHasIdOrRoles(req, requestedUserId, 'admin');

  const query: FilterQuery<Notification> = { $or: [{ user1: requestedUserId }, { user2: requestedUserId }] };
  const paginationResult = await FriendsListEntryModel.paginate(getPaginationOptions(req), query, undefined);
  const result = paginationResult.docs.map((doc) => ({
    id: doc.id,
    friend: doc.user1 === requestedUserId ? doc.user2 : doc.user1,
  }));
  return res.status(200).json(paginationApiResult(result, paginationResult));
});

export default Router().get('/api/v1/users/:id/friendsListEntries', authenticateJwt, handler);
