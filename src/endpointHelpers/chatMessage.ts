import isEmpty from 'lodash/isEmpty';
import trim from 'lodash/trim';
import { object, SchemaOf, string } from 'yup';

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
