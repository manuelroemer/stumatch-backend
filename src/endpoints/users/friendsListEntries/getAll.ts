import { Router } from 'express';
import { FilterQuery } from 'mongoose';
import { authenticateJwt } from '../../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../../utils/asyncRequestHandler';
import { getUserId, getUserOrThrow } from '../../../utils/requestHelpers';
import { validateThisUserHasSomeIdOrSomeRole } from '../../../utils/roleHelpers';
import { apiResult } from '../../../dtos/apiResults';
import { FriendsListEntry, FriendsListEntryModel } from '../../../db/models/friendsListEntry';
import { getEnrichedUserDto } from '../../../endpointHelpers/user';
import { UserModel } from '../../../db/models/user';
import { NotFoundError } from '../../../dtos/apiErrors';

const handler = asyncRequestHandler(async (req, res) => {
  const user = getUserOrThrow(req);
  const requestedUserId = getUserId(req);
  validateThisUserHasSomeIdOrSomeRole(req, requestedUserId, 'admin');

  const query: FilterQuery<FriendsListEntry> = { $or: [{ user1Id: requestedUserId }, { user2Id: requestedUserId }] };
  const friendsListEntries = await FriendsListEntryModel.find(query);
  const friendsResult = friendsListEntries.map((doc) => ({
    id: doc.id,
    friendId: doc.user1Id === requestedUserId ? doc.user2Id : doc.user1Id,
  }));

  const result = await Promise.all(
    friendsResult.map(async (friendResult) => {
      const friend = await UserModel.findById(friendResult.friendId);
      if (!friend) {
        throw new NotFoundError();
      }

      return {
        ...friendResult,
        friend: getEnrichedUserDto(friend.toObject(), user),
      };
    }),
  );

  return res.status(200).json(apiResult(result));
});

export default Router().get('/api/v1/users/:id/friendsListEntries', authenticateJwt, handler);
