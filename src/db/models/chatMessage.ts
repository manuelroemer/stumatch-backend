import { model } from 'mongoose';
import { createDbObjectSchema, DbObject } from './dbObject';

export interface ChatMessage extends DbObject {
  chatGroupId: string;
  userId: string;
  textContent: string;
  isDeleted: boolean;
}

const chatMessageSchema = createDbObjectSchema<ChatMessage>({
  chatGroupId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  textContent: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const ChatMessageModel = model<ChatMessage>('ChatMessage', chatMessageSchema);
