import { ChatGroup } from '../db/models/chatGroup';
import { User, UserModel } from '../db/models/user';
import { getEnrichedUserDto } from './user';

export async function getEnrichedChatGroupDto(chatGroup: ChatGroup, thisUser: User) {
  const activeParticipants = await Promise.all(chatGroup.activeParticipantIds.map((id) => UserModel.findById(id)));

  return {
    ...chatGroup,
    activeParticipants: activeParticipants
      .filter(Boolean)
      .map((user) => getEnrichedUserDto(user!.toObject(), thisUser)),
  };
}
