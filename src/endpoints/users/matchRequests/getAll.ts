import { Router } from 'express';
import { QueryOptions } from 'mongoose';
import { FilterQuery } from 'mongoose';
import { authenticateJwt } from '../../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../../utils/asyncRequestHandler';
import { getSortQueryFromUrl, getPaginationOptions, getUserId, getUserOrThrow } from '../../../utils/requestHelpers';
import { validateThisUserHasSomeIdOrSomeRole } from '../../../utils/roleHelpers';
import { SortableFields } from '../../../utils/parseMongooseSortQuery';
import { paginationApiResult } from '../../../dtos/apiResults';
import { MatchRequest, MatchRequestModel } from '../../../db/models/matchRequest';
import { MatchResultModel } from '../../../db/models/matchResult';
import { UserModel } from '../../../db/models/user';
import { trimPrivateUserProfileInfo } from '../utils';

const sortableFields: Array<SortableFields<MatchRequest>> = ['createdOn', 'modifiedOn'];

const handler = asyncRequestHandler(async (req, res) => {
  const requestedUserId = getUserId(req);
  validateThisUserHasSomeIdOrSomeRole(req, requestedUserId, 'admin');

  const sort = getSortQueryFromUrl(req, sortableFields);
  const query: FilterQuery<MatchRequest> = { userId: requestedUserId, isDeleted: false };
  const queryOptions: QueryOptions = { sort };
  const paginationResult = await MatchRequestModel.paginate(getPaginationOptions(req), query, undefined, queryOptions);
  const matchRequests = paginationResult.docs.map((doc) => doc.toObject());
  const apiResults = await Promise.all(
    matchRequests.map(async (matchRequest) => {
      const baseResult = {
        id: matchRequest.id,
        createdOn: matchRequest.createdOn,
        modifiedOn: matchRequest.modifiedOn,
      };

      if (matchRequest.matchResultId) {
        const matchResult = await MatchResultModel.findById(matchRequest.matchResultId);
        if (!matchResult) {
          throw new Error(`Required match result id: ${matchRequest.matchResultId} does not exist.`);
        }

        const partnerMatchRequestId =
          matchResult.matchRequest1Id === matchRequest.id ? matchResult.matchRequest2Id : matchResult.matchRequest1Id;
        const partnerMatchRequest = await MatchRequestModel.findById(partnerMatchRequestId);
        if (!partnerMatchRequest) {
          throw new Error(`Required partner match of match request: ${matchRequest.id} does not exist.`);
        }

        const acceptedByMe =
          matchResult.matchRequest1Id === matchRequest.id ? matchResult.acceptedByUser1 : matchResult.acceptedByUser2;
        const acceptedByPartner =
          matchResult.matchRequest1Id === matchRequest.id ? matchResult.acceptedByUser2 : matchResult.acceptedByUser1;

        const partner = await UserModel.findById(partnerMatchRequest.userId);
        if (!partner) {
          throw new Error(`Could not find partner user: ${partnerMatchRequest.userId} does not exist.`);
        }

        return {
          ...baseResult,
          status: getMatchRequestStatus(acceptedByMe, acceptedByPartner),
          partner: trimPrivateUserProfileInfo(partner.toObject(), getUserOrThrow(req)),
        };
      } else {
        return {
          ...baseResult,
          status: 'pending',
        };
      }
    }),
  );

  return res.status(200).json(paginationApiResult(apiResults, paginationResult));
});

export default Router().get('/api/v1/users/:id/matchRequests', authenticateJwt, handler);

function getMatchRequestStatus(acceptedByMe: boolean | null, acceptedByPartner: boolean | null) {
  if (acceptedByMe === null && acceptedByPartner === null) {
    return 'matched';
  } else if (acceptedByMe === true && acceptedByPartner === null) {
    return 'acceptedByMe';
  } else if (acceptedByMe === null && acceptedByPartner === true) {
    return 'acceptedByPartner';
  } else if (acceptedByMe === false && acceptedByPartner === null) {
    return 'declinedByMe';
  } else if (acceptedByMe === null && acceptedByPartner === false) {
    return 'declinedByPartner';
  } else {
    return 'accepted';
  }
}
