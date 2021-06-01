import { Router } from 'express';
import { FilterQuery } from 'mongoose';
import { authenticateJwt } from '../../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../../utils/asyncRequestHandler';
import { getPaginationOptions, getUserId } from '../../../utils/requestHelpers';
import { validateThisUserHasIdOrRole } from '../../../utils/roleHelpers';
import { Notification } from '../../../db/models/notification';
import { paginationApiResult } from '../../../dtos/apiResults';
import { FriendsListEntryModel } from '../../../db/models/friendsListEntry';

const handler = asyncRequestHandler(async (req, res) => {
  const requestedUserId = getUserId(req);
  validateThisUserHasIdOrRole(req, requestedUserId, 'admin');

  const query: FilterQuery<Notification> = { $or: [{ user1Id: requestedUserId }, { user2Id: requestedUserId }] };
  const paginationResult = await FriendsListEntryModel.paginate(getPaginationOptions(req), query, undefined);
  const result = paginationResult.docs.map((doc) => ({
    id: doc.id,
    friend: doc.user1Id === requestedUserId ? doc.user2Id : doc.user1Id,
  }));
  return res.status(200).json(paginationApiResult(result, paginationResult));
});

export default Router().get('/api/v1/users/:id/friendsListEntries', authenticateJwt, handler);
