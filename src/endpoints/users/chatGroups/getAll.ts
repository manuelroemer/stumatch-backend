import { Router } from 'express';
import { FilterQuery } from 'mongoose';
import { authenticateJwt } from '../../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../../utils/asyncRequestHandler';
import { getUserId } from '../../../utils/requestHelpers';
import { validateThisUserHasSomeIdOrSomeRole } from '../../../utils/roleHelpers';
import { ChatGroup, ChatGroupModel } from '../../../db/models/chatGroup';
import { apiResult } from '../../../dtos/apiResults';

const handler = asyncRequestHandler(async (req, res) => {
  const requestedUserId = getUserId(req);
  validateThisUserHasSomeIdOrSomeRole(req, requestedUserId, 'admin');

  const query: FilterQuery<ChatGroup> = { activeParticipantIds: requestedUserId };
  const results = await ChatGroupModel.find(query);
  const result = results.map((doc) => doc.toObject());
  return res.status(200).json(apiResult(result));
});

export default Router().get('/api/v1/users/:id/chatGroups', authenticateJwt, handler);
