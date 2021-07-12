import { Router } from 'express';
import { authenticateJwt } from '../../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../../utils/asyncRequestHandler';
import { ChatMessageModel } from '../../../db/models/chatMessage';
import { ChatGroupModel } from '../../../db/models/chatGroup';
import { NotFoundError } from '../../../dtos/apiErrors';
import { getUserOrThrow } from '../../../utils/requestHelpers';
import { ReadChatMessageModel } from '../../../db/models/readChatMessage';

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

  const readChatMessage =
    (await ReadChatMessageModel.findOne({ userId: user.id!, chatGroupId: chatGroup.id! })) ??
    new ReadChatMessageModel({ userId: user.id!, chatGroupId: chatGroup.id!, lastMessageReadOn: new Date(0) });

  if (readChatMessage.lastMessageReadOn < chatMessage.createdOn!) {
    readChatMessage.lastMessageReadOn = chatMessage.createdOn!;
  }

  await readChatMessage.save();

  return res.sendStatus(204);
});

export default Router().post('/api/v1/chatMessages/:id/read', authenticateJwt, handler);
