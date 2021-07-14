import { array, boolean, object, SchemaOf, string } from 'yup';
import { ChatGroup } from '../db/models/chatGroup';
import { ChatMessageModel } from '../db/models/chatMessage';
import { ReadChatMessageModel } from '../db/models/readChatMessage';
import { User, UserModel } from '../db/models/user';
import { ForbiddenError } from '../dtos/apiErrors';
import { getEnrichedUserDto } from './user';

export interface ChatGroupPostBody {
  activeParticipantIds: Array<string>;
}

export interface ChatGroupPutBody {
  id?: string;
  mutedByMe?: boolean;
}

export const chatGroupPostSchema: SchemaOf<ChatGroupPostBody> = object({
  activeParticipantIds: array().of(string().uuid().required()).required().min(1),
}).defined();

export const chatGroupPutSchema: SchemaOf<ChatGroupPutBody> = object({
  id: string().uuid(),
  mutedByMe: boolean(),
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
    id: chatGroup.id,
    activeParticipantIds: chatGroup.activeParticipantIds,
    activeParticipants: activeParticipants
      .filter(Boolean)
      .map((user) => getEnrichedUserDto(user!.toObject(), thisUser)),
    unreadMessages,
    lastMessage,
    mutedByMe: chatGroup.mutedByParticipantIds.includes(thisUser.id!),
  };
}

export function validateUserIsInChatGroup(userId: string, chatGroup: ChatGroup) {
  if (!chatGroup.activeParticipantIds.includes(userId)) {
    throw new ForbiddenError(`The user with the ID ${userId} is not a part of the requested chat group.`);
  }
}
