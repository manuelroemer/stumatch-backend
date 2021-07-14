import { model } from 'mongoose';
import { emitResourceChangedEvent } from '../../sockets/emitResourceChangedEvent';
import { createDbObjectSchema, DbObject } from './dbObject';

export interface ChatGroup extends DbObject {
  activeParticipantIds: Array<string>;
  mutedByParticipantIds: Array<string>;
}

const chatGroupSchema = createDbObjectSchema<ChatGroup>({
  activeParticipantIds: {
    type: [String],
    required: true,
    default: [],
  },
  mutedByParticipantIds: {
    type: [String],
    required: true,
    default: [],
  },
});

chatGroupSchema.post('save', async (doc: Document & ChatGroup, next) => {
  emitResourceChangedEvent(
    {
      resourceType: 'chatGroup',
      changeType: 'changed',
      id: doc.id!,
    },
    doc.activeParticipantIds,
  );

  next();
});

export const ChatGroupModel = model<ChatGroup>('ChatGroup', chatGroupSchema);
