import { Router } from 'express';
import { FilterQuery } from 'mongoose';
import { authenticateJwt } from '../../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../../utils/asyncRequestHandler';
import { cursorPaginationApiResult } from '../../../dtos/apiResults';
import { ChatMessage, ChatMessageModel } from '../../../db/models/chatMessage';
import { QueryOptions } from 'mongoose';
import { ChatGroupModel } from '../../../db/models/chatGroup';
import { getUserOrThrow, getDateQueryParam, getPaginationOptions } from '../../../utils/requestHelpers';
import { ForbiddenError, NotFoundError } from '../../../dtos/apiErrors';
import { updateReadChatMessageForUser } from '../../../endpointHelpers/chatGroup';

const handler = asyncRequestHandler(async (req, res) => {
  const chatGroupId = req.params['id'];
  const before = getDateQueryParam(req, 'before') ?? new Date();
  const after = getDateQueryParam(req, 'after');
  const { pageSize } = getPaginationOptions(req);
  const user = getUserOrThrow(req);

  const chatGroup = await ChatGroupModel.findById(chatGroupId);
  if (!chatGroup) {
    throw new NotFoundError();
  }

  if (!chatGroup.activeParticipantIds.includes(user.id!)) {
    throw new ForbiddenError();
  }

  const query: FilterQuery<ChatMessage> = {
    chatGroupId,
    createdOn: after ? { $gt: after } : { $lt: before },
  };
  const options: QueryOptions = { sort: { createdOn: 'desc' } };
  const queryResult = await ChatMessageModel.find(query, undefined, options).limit(pageSize);
  const result = queryResult.map((doc) => doc.toObject()).reverse();
  const beforeCursor = result.length > 0 ? result[0].createdOn : null;
  const afterCursor = result.length > 0 ? result[result.length - 1].createdOn : null;
  const apiResult = cursorPaginationApiResult(result, {
    pageSize,
    cursor: after ?? before,
    beforeCursor,
    afterCursor,
  });

  await updateReadChatMessageForUser(chatGroupId, user.id!);

  return res.status(200).json(apiResult);
});

export default Router().get('/api/v1/chatGroups/:id/chatMessages', authenticateJwt, handler);
