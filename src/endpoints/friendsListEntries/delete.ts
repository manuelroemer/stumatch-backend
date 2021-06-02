import { Router } from 'express';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { validateThisUserHasSomeIdOrSomeRole } from '../../utils/roleHelpers';
import { FriendsListEntryModel } from '../../db/models/friendsListEntry';
import { NotFoundError } from '../../dtos/apiErrors';

const handler = asyncRequestHandler(async (req, res) => {
  const id = req.params.id;
  const friendsListEntry = await FriendsListEntryModel.findById(id);

  if (!friendsListEntry) {
    throw new NotFoundError();
  }

  validateThisUserHasSomeIdOrSomeRole(req, [friendsListEntry.user1Id, friendsListEntry.user2Id], 'admin');
  await friendsListEntry.delete();

  return res.sendStatus(204);
});

export default Router().delete('/api/v1/friendsListEntries/:id', authenticateJwt, handler);
