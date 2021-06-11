import { model } from 'mongoose';
import { createDbObjectSchema, DbObject } from './dbObject';

export interface ChatGroup extends DbObject {
  activeParticipantIds: Array<string>;
}

const chatGroupSchema = createDbObjectSchema<ChatGroup>({
  activeParticipantIds: {
    type: [String],
    required: true,
    default: [],
  },
});

export const ChatGroupModel = model<ChatGroup>('ChatGroup', chatGroupSchema);
