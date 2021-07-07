import { Router } from 'express';
import { apiResult } from '../../../dtos/apiResults';
import { authenticateJwt } from '../../../middlewares/authenticateJwt';
import { validateRequestBody } from '../../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../../utils/asyncRequestHandler';
import { ChatMessageModel } from '../../../db/models/chatMessage';
import { ChatGroupModel } from '../../../db/models/chatGroup';
import { NotFoundError } from '../../../dtos/apiErrors';
import { getUserOrThrow } from '../../../utils/requestHelpers';
import {
  ChatMessagePostBody,
  chatMessageSchema,
  validateUserIsInChatGroup,
} from '../../../endpointHelpers/chatMessage';

const handler = asyncRequestHandler(async (req, res) => {
  const user = getUserOrThrow(req);
  const body = req.body as ChatMessagePostBody;
  const chatGroup = await ChatGroupModel.findById(req.params.id);
  if (!chatGroup) {
    throw new NotFoundError();
  }

  validateUserIsInChatGroup(user.id!, chatGroup);

  const message = await ChatMessageModel.create({
    _id: body.id,
    chatGroupId: chatGroup.id,
    userId: user.id,
    textContent: body.textContent,
  });

  return res.status(201).json(apiResult(message.toObject()));
});

export default Router().post(
  '/api/v1/chatGroups/:id/chatMessages',
  authenticateJwt,
  validateRequestBody(chatMessageSchema),
  handler,
);
