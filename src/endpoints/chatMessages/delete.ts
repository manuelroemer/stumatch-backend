import { Router } from 'express';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { validateThisUserHasSomeIdOrSomeRole } from '../../utils/roleHelpers';
import { NotFoundError } from '../../dtos/apiErrors';
import { ChatMessageModel } from '../../db/models/chatMessage';
import { apiResult } from '../../dtos/apiResults';

const handler = asyncRequestHandler(async (req, res) => {
  const id = req.params.id;
  const chatMessage = await ChatMessageModel.findById(id);
  if (!chatMessage) {
    throw new NotFoundError();
  }

  validateThisUserHasSomeIdOrSomeRole(req, chatMessage.userId, 'admin');
  chatMessage.isDeleted = true;
  chatMessage.textContent = '';
  await chatMessage.save();

  return res.status(200).json(apiResult(chatMessage.toObject()));
});

export default Router().delete('/api/v1/chatMessages/:id', authenticateJwt, handler);
