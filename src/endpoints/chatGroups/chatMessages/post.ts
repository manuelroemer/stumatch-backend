import { object, SchemaOf, string } from 'yup';
import trim from 'lodash/trim';
import isEmpty from 'lodash/isEmpty';
import { Router } from 'express';
import { apiResult } from '../../../dtos/apiResults';
import { authenticateJwt } from '../../../middlewares/authenticateJwt';
import { validateRequestBody } from '../../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../../utils/asyncRequestHandler';
import { ChatMessageModel } from '../../../db/models/chatMessage';
import { ChatGroupModel } from '../../../db/models/chatGroup';
import { ForbiddenError, NotFoundError } from '../../../dtos/apiErrors';
import { getUserOrThrow } from '../../../utils/requestHelpers';

interface RequestBody {
  textContent: string;
}

const schema: SchemaOf<RequestBody> = object({
  textContent: string()
    .required()
    .test('notEmpty', 'The message should not be empty.', (value) => !isEmpty(trim(value))),
}).defined();

const handler = asyncRequestHandler(async (req, res) => {
  const user = getUserOrThrow(req);
  const body = req.body as RequestBody;
  const chatGroup = await ChatGroupModel.findById(req.params.id);
  if (!chatGroup) {
    throw new NotFoundError();
  }

  if (!chatGroup.activeParticipantIds.includes(user.id!)) {
    throw new ForbiddenError(`The user with the ID ${user.id} is not a part of the requested chat group.`);
  }

  const message = await ChatMessageModel.create({
    chatGroupId: chatGroup.id,
    userId: user.id,
    textContent: body.textContent,
  });

  return res.status(201).json(apiResult(message.toObject()));
});

export default Router().post(
  '/api/v1/chatGroups/:id/chatMessages',
  authenticateJwt,
  validateRequestBody(schema),
  handler,
);
