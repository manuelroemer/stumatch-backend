import { ChatGroupModel } from '../db/models/chatGroup';
import { MatchRequest, MatchRequestModel } from '../db/models/matchRequest';
import { MatchResultModel } from '../db/models/matchResult';
import { PastUserMatchEntryModel } from '../db/models/pastUserMatchEntry';
import { User, UserModel } from '../db/models/user';
import { logger } from '../log';

export async function findMatchingMatchRequest(matchRequest: MatchRequest) {
  const currentUser = await UserModel.findOne({ _id: matchRequest.userId });
  if (!currentUser) {
    logger.warn(`Could not find the user with the id: ${matchRequest.userId}. Not executing the matching algorithm.`);
    return;
  }
  const pendingMatchRequests = await MatchRequestModel.find(
    {
      userId: { $ne: matchRequest.userId },
      matchResultId: { $exists: false },
      isDeleted: false,
    },
    undefined,
    {
      sort: { createdOn: 'asc' },
    },
  );

  for (const pendingMatchRequest of pendingMatchRequests) {
    const pendingUser = await UserModel.findOne({ _id: pendingMatchRequest.userId });

    if (!pendingUser) {
      continue;
    }

    if (
      isFacultyStudyProgramMatch(matchRequest, pendingUser) &&
      isFacultyStudyProgramMatch(pendingMatchRequest, currentUser) &&
      isSemesterMatch(matchRequest, pendingUser) &&
      isSemesterMatch(pendingMatchRequest, currentUser) &&
      !hasPastMatch(matchRequest.userId, pendingMatchRequest.userId)
    ) {
      const chatGroup = await ChatGroupModel.create({
        activeParticipantIds: [matchRequest.userId, pendingMatchRequest.userId],
      });

      await MatchResultModel.create({
        matchRequest1Id: matchRequest.id,
        matchRequest2Id: pendingMatchRequest.id,
        chatGroupId: chatGroup.id,
      });

      await PastUserMatchEntryModel.create({
        user1Id: matchRequest.userId,
        user2Id: pendingMatchRequest.userId,
      });
      return;
    }
  }
}

function calculateSemester(startingSemester: string, startingYear: number) {
  const startMonthSS = 3;
  const startMonthWS = 9;
  const currentYear = new Date().getFullYear();

  const currentSemester = new Date().getMonth() < startMonthSS || new Date().getMonth() >= startMonthWS ? 'WS' : 'SS';

  if (startingYear > currentYear || (startingYear === currentYear && currentSemester !== startingSemester)) {
    return 1;
  } else {
    return currentSemester === startingSemester
      ? (currentYear - startingYear) * 2 + 1
      : (currentYear - startingYear) * 2;
  }
}

function isSemesterMatch(thisMatchRequest: MatchRequest, otherUser: User) {
  if (!thisMatchRequest.minSemester || !thisMatchRequest.maxSemester) {
    return true;
  }

  if (!otherUser.startingSemester || !otherUser.startingYear) {
    return false;
  }

  const userSemester = calculateSemester(otherUser.startingSemester, otherUser.startingYear);
  return userSemester >= thisMatchRequest.minSemester && userSemester <= thisMatchRequest.maxSemester;

}

function isFacultyStudyProgramMatch(thisMatchRequest: MatchRequest, otherUser: User) {
  if (!thisMatchRequest.facultyId && !thisMatchRequest.studyProgramId) {
    return true;
  } else if (
    (!!thisMatchRequest.facultyId && !otherUser.facultyId) ||
    (!!thisMatchRequest.studyProgramId && !otherUser.studyProgramId)
  ) {
    return false;
  } else {
    return (
      thisMatchRequest.facultyId === otherUser.facultyId && thisMatchRequest.studyProgramId === otherUser.studyProgramId
    );
  }

  // if (!otherUser.facultyId || !otherUser.studyProgramId) {
  //   return false;
  // }
}

async function hasPastMatch(user1Id: string, user2Id: string) {
  const pastUser1 = await PastUserMatchEntryModel.findOne({ user1Id: user1Id, user2Id: user2Id });
  const pastUser2 = await PastUserMatchEntryModel.findOne({ user1Id: user2Id, user2Id: user1Id });

  return !!pastUser1 || !!pastUser2;
}
