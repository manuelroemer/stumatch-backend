import { Router } from 'express';
import { boolean, object, SchemaOf } from 'yup';
import { ChatGroupModel } from '../../../db/models/chatGroup';
import { MatchRequestModel } from '../../../db/models/matchRequest';
import { MatchResultModel } from '../../../db/models/matchResult';
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
  const matchRequest = await MatchRequestModel.findOne({ _id: req.params.id, isDeleted: false });
  if (!matchRequest) {
    throw new BadRequestError();
  }

  validateThisUserHasSomeIdOrSomeRole(req, matchRequest.userId, []);

  const matchResult = await MatchResultModel.findOne({ _id: matchRequest.matchResultId });
  if (!matchResult) {
    throw new NotFoundError();
  }

  if (matchResult.matchRequest1Id === req.params.id) {
    if (matchResult.acceptedByUser1 === null) {
      matchResult.acceptedByUser1 = body.accepted;
    } else {
      throw new BadRequestError('Status already has been set.');
    }
  } else {
    if (matchResult.acceptedByUser2 === null) {
      matchResult.acceptedByUser2 = body.accepted;
    } else {
      throw new BadRequestError('Status already has been set.');
    }
  }
  if (matchResult.acceptedByUser1 && matchResult.acceptedByUser2) {
    const user1 = await MatchRequestModel.findById(matchResult.matchRequest1Id);
    const user2 = await MatchRequestModel.findById(matchResult.matchRequest2Id);
    const chatgroup = await ChatGroupModel.create({ activeParticipantIds: [user1!.id, user2!.id] });
    matchResult.chatGroupId = chatgroup.id;
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
