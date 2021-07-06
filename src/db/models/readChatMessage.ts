import { model } from 'mongoose';
import { emitResourceChangedEvent } from '../../sockets/emitResourceChangedEvent';
import { createDbObjectSchema, DbObject } from './dbObject';

export interface ReadChatMessage extends DbObject {
  userId: string;
  chatGroupId: string;
  lastMessageReadOn: Date;
}

const readChatMessageSchema = createDbObjectSchema<ReadChatMessage>({
  userId: {
    type: String,
    required: true,
  },
  chatGroupId: {
    type: String,
    required: true,
  },
  lastMessageReadOn: {
    type: Date,
    required: true,
  },
});

readChatMessageSchema.index({ userId: 1, chatGroupId: 1 }, { unique: true });

readChatMessageSchema.post('save', async (doc: Document & ReadChatMessage, next) => {
  // The ChatGroup DTO contains the unreadMessages info.
  emitResourceChangedEvent(
    {
      resourceType: 'chatGroup',
      changeType: 'changed',
      id: doc.chatGroupId,
    },
    doc.userId,
  );

  next();
});

export const ReadChatMessageModel = model<ReadChatMessage>('ReadChatMessage', readChatMessageSchema);
