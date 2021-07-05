import { ChatGroup } from '../db/models/chatGroup';
import { ChatMessageModel } from '../db/models/chatMessage';
import { User, UserModel } from '../db/models/user';
import { getEnrichedUserDto } from './user';

export async function getEnrichedChatGroupDto(chatGroup: ChatGroup, thisUser: User) {
  const activeParticipants = await Promise.all(chatGroup.activeParticipantIds.map((id) => UserModel.findById(id)));
  const lastMessage = await ChatMessageModel.findOne({ chatGroupId: chatGroup.id })
    .sort({ createdOn: 'desc' })
    .limit(1);

  return {
    ...chatGroup,
    activeParticipants: activeParticipants
      .filter(Boolean)
      .map((user) => getEnrichedUserDto(user!.toObject(), thisUser)),
    lastMessage,
  };
}
