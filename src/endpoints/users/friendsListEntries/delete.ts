import { Router } from 'express';
import { authenticateJwt } from '../../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../../utils/asyncRequestHandler';
import { validateThisUserHasIdOrRole } from '../../../utils/roleHelpers';
import { FriendsListEntryModel } from '../../../db/models/friendsListEntry';
import { NotFoundError } from '../../../dtos/apiErrors';

const handler = asyncRequestHandler(async (req, res) => {
  const id = req.params.id;
  const friendsListEntry = await FriendsListEntryModel.findById(id);

  if (!friendsListEntry) {
    throw new NotFoundError();
  }

  validateThisUserHasIdOrRole(req, friendsListEntry.userId, 'admin');
  await friendsListEntry.delete();

  return res.sendStatus(204);
});

export default Router().get('/api/v1/friendsListEntries/:id', authenticateJwt, handler);
