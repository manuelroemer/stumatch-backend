import { Router } from 'express';
import { ChatGroupModel } from '../../db/models/chatGroup';
import { NotFoundError } from '../../dtos/apiErrors';
import { apiResult } from '../../dtos/apiResults';
import { getEnrichedChatGroupDto } from '../../endpointHelpers/chatGroup';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { getUserOrThrow } from '../../utils/requestHelpers';

const handler = asyncRequestHandler(async (req, res) => {
  const user = getUserOrThrow(req);
  const id = req.params.id;
  const chatGroup = await ChatGroupModel.findById(id);

  if (!chatGroup) {
    throw new NotFoundError();
  }

  const result = await getEnrichedChatGroupDto(chatGroup.toObject(), user);
  return res.status(200).json(apiResult(result));
});

export default Router().get('/api/v1/chatGroups/:id', authenticateJwt, handler);
