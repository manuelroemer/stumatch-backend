import { Router } from 'express';
import { NotFoundError } from '../../dtos/apiErrors';
import { apiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { validateBodyIdMatchesPathId } from '../../middlewares/validateBodyIdMatchesPathId';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import {
  ChatGroupPutBody,
  chatGroupPutSchema,
  getEnrichedChatGroupDto,
  validateUserIsInChatGroup,
} from '../../endpointHelpers/chatGroup';
import { ChatGroupModel } from '../../db/models/chatGroup';
import { getUserOrThrow } from '../../utils/requestHelpers';
import uniq from 'lodash/uniq';

const handler = asyncRequestHandler(async (req, res) => {
  const user = getUserOrThrow(req);
  const body = req.body as ChatGroupPutBody;
  const id = req.params.id;
  const chatGroup = await ChatGroupModel.findById(id);
  if (!chatGroup) {
    throw new NotFoundError();
  }

  validateUserIsInChatGroup(user.id!, chatGroup);

  if (body.mutedByMe !== undefined) {
    chatGroup.mutedByParticipantIds = body.mutedByMe
      ? uniq([...chatGroup.mutedByParticipantIds, user.id!])
      : chatGroup.mutedByParticipantIds.filter((id) => id !== user.id);
  }

  await chatGroup.save();
  return res.status(200).json(apiResult(await getEnrichedChatGroupDto(chatGroup.toObject(), user)));
});

export default Router().put(
  '/api/v1/chatGroups/:id',
  authenticateJwt,
  validateRequestBody(chatGroupPutSchema),
  validateBodyIdMatchesPathId(),
  handler,
);
