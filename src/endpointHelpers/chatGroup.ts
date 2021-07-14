import { array, object, SchemaOf, string } from 'yup';
import { ChatGroup } from '../db/models/chatGroup';
import { ChatMessageModel } from '../db/models/chatMessage';
import { ReadChatMessageModel } from '../db/models/readChatMessage';
import { User, UserModel } from '../db/models/user';
import { getEnrichedUserDto } from './user';

export interface ChatGroupPostBody {
  activeParticipantIds: Array<string>;
}

export const chatGroupSchema: SchemaOf<ChatGroupPostBody> = object({
  activeParticipantIds: array().of(string().uuid().required()).required().min(1),
}).defined();

export async function getEnrichedChatGroupDto(chatGroup: ChatGroup, thisUser: User) {
  const activeParticipants = await Promise.all(chatGroup.activeParticipantIds.map((id) => UserModel.findById(id)));
  const readChatMessageInfo = await ReadChatMessageModel.findOne({ userId: thisUser.id!, chatGroupId: chatGroup.id! });
  const unreadMessages = await ChatMessageModel.count({
    chatGroupId: chatGroup.id!,
    createdOn: { $gt: readChatMessageInfo?.lastMessageReadOn ?? new Date(0) },
  });
  const lastMessage = await ChatMessageModel.findOne({ chatGroupId: chatGroup.id, isDeleted: false })
    .sort({ createdOn: 'desc' })
    .limit(1);

  return {
    ...chatGroup,
    activeParticipants: activeParticipants
      .filter(Boolean)
      .map((user) => getEnrichedUserDto(user!.toObject(), thisUser)),
    unreadMessages,
    lastMessage,
  };
}
