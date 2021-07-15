import { Router } from 'express';
import { boolean, object, SchemaOf } from 'yup';
import { FriendsListEntryModel } from '../../../db/models/friendsListEntry';
import { MatchRequestModel } from '../../../db/models/matchRequest';
import { MatchResultModel } from '../../../db/models/matchResult';
import { BadRequestError, NotFoundError } from '../../../dtos/apiErrors';
import { apiResult } from '../../../dtos/apiResults';
import {
  tryCreateMatchRequestAcceptedByPartnerNotification,
  tryCreateMatchRequestDeclinedByPartnerNotification,
} from '../../../endpointHelpers/notification';
import { authenticateJwt } from '../../../middlewares/authenticateJwt';
import { validateRequestBody } from '../../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../../utils/asyncRequestHandler';
import { getUserOrThrow } from '../../../utils/requestHelpers';
import { validateThisUserHasSomeIdOrSomeRole } from '../../../utils/roleHelpers';

interface RequestBody {
  accepted: boolean;
}

const schema: SchemaOf<RequestBody> = object({
  accepted: boolean().required(),
}).defined();

const handler = asyncRequestHandler(async (req, res) => {
  const user = getUserOrThrow(req);
  const body = req.body as RequestBody;
  const matchRequest = await MatchRequestModel.findOne({ _id: req.params.id });
  if (!matchRequest) {
    throw new BadRequestError();
  }

  validateThisUserHasSomeIdOrSomeRole(req, matchRequest.userId, []);

  const matchResult = await MatchResultModel.findOne({ _id: matchRequest.matchResultId });
  if (!matchResult) {
    throw new NotFoundError();
  }

  if (matchResult.matchRequest1Id === req.params.id) {
    if (!matchResult.acceptedByUser1) {
      matchResult.acceptedByUser1 = body.accepted;
    } else {
      throw new BadRequestError('Status already has been set.');
    }
  } else {
    if (!matchResult.acceptedByUser2) {
      matchResult.acceptedByUser2 = body.accepted;
    } else {
      throw new BadRequestError('Status already has been set.');
    }
  }

  const user1MatchRequest = await MatchRequestModel.findById(matchResult.matchRequest1Id);
  const user2MatchRequest = await MatchRequestModel.findById(matchResult.matchRequest2Id);
  if (!user1MatchRequest || !user2MatchRequest) {
    throw new NotFoundError();
  }

  const partnerUserId = user1MatchRequest.userId === user.id ? user2MatchRequest.userId : user1MatchRequest.userId;
  if (body.accepted) {
    await tryCreateMatchRequestAcceptedByPartnerNotification(partnerUserId, user);
  } else {
    await tryCreateMatchRequestDeclinedByPartnerNotification(partnerUserId, user);
  }

  if (matchResult.acceptedByUser1 && matchResult.acceptedByUser2) {
    const friendsListEntry1 = await FriendsListEntryModel.findOne({
      user1Id: user1MatchRequest!.userId,
      user2Id: user2MatchRequest!.userId,
    });
    const friendsListEntry2 = await FriendsListEntryModel.findOne({
      user1Id: user2MatchRequest!.userId,
      user2Id: user1MatchRequest!.userId,
    });

    if (!friendsListEntry1 && !friendsListEntry2) {
      await FriendsListEntryModel.create({ user1Id: user1MatchRequest!.userId, user2Id: user2MatchRequest!.userId });
    }
  }

  await matchResult.save();

  return res.status(201).json(apiResult(matchResult.toObject()));
});

export default Router().post(
  '/api/v1/matchRequests/:id/acceptOrDecline',
  authenticateJwt,
  validateRequestBody(schema),
  handler,
);
