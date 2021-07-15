import { Router } from 'express';
import { FilterQuery } from 'mongoose';
import { ChatGroupModel } from '../../db/models/chatGroup';
import { FriendsListEntry, FriendsListEntryModel } from '../../db/models/friendsListEntry';
import { User } from '../../db/models/user';
import { BadRequestError } from '../../dtos/apiErrors';
import { apiResult } from '../../dtos/apiResults';
import { chatGroupPostSchema, ChatGroupPostBody } from '../../endpointHelpers/chatGroup';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { getUserOrThrow } from '../../utils/requestHelpers';
import uniq from 'lodash/uniq';

const handler = asyncRequestHandler(async (req, res) => {
  const user = getUserOrThrow(req);
  const body = req.body as ChatGroupPostBody;
  await validateAllParticipantsAreFriends(user, body);
  const activeParticipantIds = uniq([...body.activeParticipantIds, user.id!]);
  const chatGroup =
    (await findExistingChatGroup(activeParticipantIds)) ?? (await createNewChatGroup(activeParticipantIds));
  return res.status(201).json(apiResult(chatGroup.toObject()));
});

async function validateAllParticipantsAreFriends(user: User, body: ChatGroupPostBody) {
  await Promise.all(
    body.activeParticipantIds.map(async (participantId) => {
      const query: FilterQuery<FriendsListEntry> = {
        $or: [
          { user1Id: user.id, user2Id: participantId },
          { user1Id: participantId, user2Id: user.id },
        ],
      };
      const isFriend = (await FriendsListEntryModel.count(query)) > 0;

      if (!isFriend) {
        throw new BadRequestError(`The user ${participantId} is not in the current user's friends list.`);
      }
    }),
  );
}

async function findExistingChatGroup(activeParticipantIds: Array<string>) {
  return await ChatGroupModel.findOne({
    activeParticipantIds: { $all: activeParticipantIds, $size: activeParticipantIds.length },
  });
}

async function createNewChatGroup(activeParticipantIds: Array<string>) {
  return await ChatGroupModel.create({ activeParticipantIds });
}

export default Router().post('/api/v1/chatGroups', authenticateJwt, validateRequestBody(chatGroupPostSchema), handler);
