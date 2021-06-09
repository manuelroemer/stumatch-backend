import { Router } from 'express';
import { FilterQuery } from 'mongoose';
import { authenticateJwt } from '../../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../../utils/asyncRequestHandler';
import { apiResult } from '../../../dtos/apiResults';
import { ChatMessage, ChatMessageModel } from '../../../db/models/chatMessage';
import { QueryOptions } from 'mongoose';
import { ChatGroupModel } from '../../../db/models/chatGroup';
import { getUserOrThrow } from '../../../utils/requestHelpers';
import { ForbiddenError, NotFoundError } from '../../../dtos/apiErrors';

const handler = asyncRequestHandler(async (req, res) => {
  const chatGroupId = req.params['id'];
  const user = getUserOrThrow(req);

  const chatGroup = await ChatGroupModel.findById(chatGroupId);
  if (!chatGroup) {
    throw new NotFoundError();
  }

  if (!chatGroup.activeParticipantIds.includes(user.id!)) {
    throw new ForbiddenError();
  }

  const query: FilterQuery<ChatMessage> = { chatGroupId };
  const options: QueryOptions = { sort: { createdOn: 'desc' } };
  const queryResult = await ChatMessageModel.find(query, undefined, options);
  const result = queryResult.map((doc) => doc.toObject());
  return res.status(200).json(apiResult(result));
});

export default Router().get('/api/v1/chatGroups/:id/chatMessages', authenticateJwt, handler);
