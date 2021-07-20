import { Router } from 'express';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { validateThisUserHasSomeIdOrSomeRole } from '../../utils/roleHelpers';
import { FriendsListEntryModel } from '../../db/models/friendsListEntry';
import { NotFoundError } from '../../dtos/apiErrors';
import { ChatGroupModel } from '../../db/models/chatGroup';
import { findExistingChatGroup } from '../../endpointHelpers/chatGroup';

const handler = asyncRequestHandler(async (req, res) => {
  const id = req.params.id;
  const friendsListEntry = await FriendsListEntryModel.findById(id);

  if (!friendsListEntry) {
    throw new NotFoundError();
  }

  validateThisUserHasSomeIdOrSomeRole(req, [friendsListEntry.user1Id, friendsListEntry.user2Id], 'admin');

  const chatGroup = await findExistingChatGroup([friendsListEntry.user1Id, friendsListEntry.user2Id]);
  if (chatGroup) {
    await ChatGroupModel.findByIdAndDelete(chatGroup.id);
  }

  await friendsListEntry.delete();

  return res.sendStatus(204);
});

export default Router().delete('/api/v1/friendsListEntries/:id', authenticateJwt, handler);
