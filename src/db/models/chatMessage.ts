import { model, Document } from 'mongoose';
import { emitResourceChangedEvent } from '../../sockets/emitResourceChangedEvent';
import { ChatGroupModel } from './chatGroup';
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
    required: false,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

chatMessageSchema.post('save', async (doc: Document & ChatMessage, next) => {
  const chatGroup = await ChatGroupModel.findById(doc.chatGroupId);
  if (!chatGroup) {
    return;
  }

  emitResourceChangedEvent(
    {
      resourceType: 'chatMessage',
      changeType: 'changed',
      id: doc.id,
    },
    chatGroup.activeParticipantIds,
  );

  // The chat group implicitly changes because the API contains a 'lastMessage' attribute.
  emitResourceChangedEvent(
    {
      resourceType: 'chatGroup',
      changeType: 'changed',
      id: chatGroup.id,
    },
    chatGroup.activeParticipantIds,
  );

  next();
});

export const ChatMessageModel = model<ChatMessage>('ChatMessage', chatMessageSchema);
