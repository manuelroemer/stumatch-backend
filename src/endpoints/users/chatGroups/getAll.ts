import { Router } from 'express';
import { FilterQuery } from 'mongoose';
import { authenticateJwt } from '../../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../../utils/asyncRequestHandler';
import { getPaginationOptions, getUserId } from '../../../utils/requestHelpers';
import { validateThisUserHasSomeIdOrSomeRole } from '../../../utils/roleHelpers';
import { paginationApiResult } from '../../../dtos/apiResults';
import { ChatGroup, ChatGroupModel } from '../../../db/models/chatGroup';

const handler = asyncRequestHandler(async (req, res) => {
  const requestedUserId = getUserId(req);
  validateThisUserHasSomeIdOrSomeRole(req, requestedUserId, 'admin');

  const query: FilterQuery<ChatGroup> = { activeParticipantIds: requestedUserId };
  const paginationResult = await ChatGroupModel.paginate(getPaginationOptions(req), query, undefined);
  const result = paginationResult.docs.map((doc) => doc.toObject());
  return res.status(200).json(paginationApiResult(result, paginationResult));
});

export default Router().get('/api/v1/users/:id/chatGroups', authenticateJwt, handler);
