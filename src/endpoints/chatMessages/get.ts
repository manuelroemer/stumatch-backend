import { Router } from 'express';
import { ChatGroupModel } from '../../db/models/chatGroup';
import { ChatMessageModel } from '../../db/models/chatMessage';
import { NotFoundError } from '../../dtos/apiErrors';
import { apiResult } from '../../dtos/apiResults';
import { validateUserIsInChatGroup } from '../../endpointHelpers/chatMessage';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { getUserOrThrow } from '../../utils/requestHelpers';

const handler = asyncRequestHandler(async (req, res) => {
  const user = getUserOrThrow(req);
  const id = req.params.id;
  const chatMessage = await ChatMessageModel.findById(id);
  if (!chatMessage) {
    throw new NotFoundError();
  }

  const chatGroup = await ChatGroupModel.findById(chatMessage.chatGroupId);
  if (!chatGroup) {
    throw new NotFoundError();
  }

  validateUserIsInChatGroup(user.id!, chatGroup);

  return res.status(200).json(apiResult(chatMessage.toObject()));
});

export default Router().get('/api/v1/chatMessages/:id', authenticateJwt, handler);
