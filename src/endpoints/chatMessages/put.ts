import { Router } from 'express';
import { NotFoundError } from '../../dtos/apiErrors';
import { apiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { validateBodyIdMatchesPathId } from '../../middlewares/validateBodyIdMatchesPathId';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { ChatMessagePutBody, chatMessageSchema } from '../../endpointHelpers/chatMessage';
import { ChatMessageModel } from '../../db/models/chatMessage';
import { ChatGroupModel } from '../../db/models/chatGroup';
import { validateThisUserHasSomeIdOrSomeRole } from '../../utils/roleHelpers';

const handler = asyncRequestHandler(async (req, res) => {
  const body = req.body as ChatMessagePutBody;
  const id = req.params.id;
  const chatMessage = await ChatMessageModel.findById(id);
  if (!chatMessage || chatMessage.isDeleted) {
    throw new NotFoundError();
  }

  const chatGroup = await ChatGroupModel.findById(chatMessage.chatGroupId);
  if (!chatGroup) {
    throw new NotFoundError();
  }

  validateThisUserHasSomeIdOrSomeRole(req, chatMessage.userId, 'admin');

  Object.assign(chatMessage, body);
  await chatMessage.save();

  return res.status(200).json(apiResult(chatMessage.toObject()));
});

export default Router().put(
  '/api/v1/chatMessages/:id',
  authenticateJwt,
  validateRequestBody(chatMessageSchema),
  validateBodyIdMatchesPathId(),
  handler,
);
