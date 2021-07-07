import { Router } from 'express';
import { boolean, object, SchemaOf } from 'yup';
import { FriendsListEntryModel } from '../../../db/models/friendsListEntry';
import { MatchRequestModel } from '../../../db/models/matchRequest';
import { MatchResultModel } from '../../../db/models/matchResult';
import { NotificationModel } from '../../../db/models/notification';
import { BadRequestError, NotFoundError } from '../../../dtos/apiErrors';
import { apiResult } from '../../../dtos/apiResults';
import { authenticateJwt } from '../../../middlewares/authenticateJwt';
import { validateRequestBody } from '../../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../../utils/asyncRequestHandler';
import { validateThisUserHasSomeIdOrSomeRole } from '../../../utils/roleHelpers';

interface RequestBody {
  accepted: boolean;
}

const schema: SchemaOf<RequestBody> = object({
  accepted: boolean().required(),
}).defined();

const handler = asyncRequestHandler(async (req, res) => {
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
  const user2MatchReqeuest = await MatchRequestModel.findById(matchResult.matchRequest2Id);

  await NotificationModel.create({
    type: body.accepted ? 'matchRequestAcceptedByPartner' : 'matchRequestDeclinedByPartner',
    userId: matchResult.matchRequest1Id === req.params.id ? user2MatchReqeuest?.userId : user1MatchRequest?.userId,
    matchRequestId: req.params.id,
  });

  if (matchResult.acceptedByUser1 && matchResult.acceptedByUser2) {
    const friendsListEntry1 = await FriendsListEntryModel.findOne({
      user1Id: user1MatchRequest!.userId,
      user2Id: user2MatchReqeuest!.userId,
    });
    const friendsListEntry2 = await FriendsListEntryModel.findOne({
      user1Id: user2MatchReqeuest!.userId,
      user2Id: user1MatchRequest!.userId,
    });

    if (!friendsListEntry1 && !friendsListEntry2) {
      await FriendsListEntryModel.create({ user1Id: user1MatchRequest!.userId, user2Id: user2MatchReqeuest!.userId });
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
