import isEmpty from 'lodash/isEmpty';
import trim from 'lodash/trim';
import { object, SchemaOf, string } from 'yup';
import { ChatGroup } from '../db/models/chatGroup';
import { ForbiddenError } from '../dtos/apiErrors';

export interface ChatMessagePostBody {
  id?: string;
  textContent: string;
}

export type ChatMessagePutBody = ChatMessagePostBody;

export const chatMessageSchema: SchemaOf<ChatMessagePostBody> = object({
  id: string().uuid(),
  textContent: string()
    .required()
    .test('notEmpty', 'The message should not be empty.', (value) => !isEmpty(trim(value))),
}).defined();

export function validateUserIsInChatGroup(userId: string, chatGroup: ChatGroup) {
  if (!chatGroup.activeParticipantIds.includes(userId)) {
    throw new ForbiddenError(`The user with the ID ${userId} is not a part of the requested chat group.`);
  }
}
