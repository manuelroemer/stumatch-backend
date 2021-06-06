import { Router } from 'express';
import { QueryOptions } from 'mongoose';
import { FilterQuery } from 'mongoose';
import { authenticateJwt } from '../../../middlewares/authenticateJwt';
import { asyncRequestHandler } from '../../../utils/asyncRequestHandler';
import { getSortQueryFromUrl, getPaginationOptions, getUserId } from '../../../utils/requestHelpers';
import { validateThisUserHasSomeIdOrSomeRole } from '../../../utils/roleHelpers';
import { SortableFields } from '../../../utils/parseMongooseSortQuery';
import { paginationApiResult } from '../../../dtos/apiResults';
import { MatchRequest, MatchRequestModel } from '../../../db/models/matchRequest';
import { MatchResultModel } from '../../../db/models/matchResult';
import { UserModel } from '../../../db/models/user';

const sortableFields: Array<SortableFields<MatchRequest>> = ['createdOn', 'modifiedOn'];

const handler = asyncRequestHandler(async (req, res) => {
  const requestedUserId = getUserId(req);
  validateThisUserHasSomeIdOrSomeRole(req, requestedUserId, 'admin');

  const sort = getSortQueryFromUrl(req, sortableFields);
  const query: FilterQuery<MatchRequest> = { userId: requestedUserId };
  const queryOptions: QueryOptions = { sort };
  const paginationResult = await MatchRequestModel.paginate(getPaginationOptions(req), query, undefined, queryOptions);
  const matchRequests: Array<any> = paginationResult.docs.map((doc) => doc.toObject());

  for (const matchRequest of matchRequests) {
    if (matchRequest.matchResultId) {
      const matchResult = await MatchResultModel.findById(matchRequest.matchResultId);
      if (!matchResult) {
        throw new Error(`Required match result id: ${matchRequest.matchResultId} does not exist.`);
      }


      let partnerMatchRequest;
      if (matchResult.matchRequest1Id === matchRequest.id) {
        partnerMatchRequest = await MatchRequestModel.findById(matchResult.matchRequest2Id);
      } else {
        partnerMatchRequest = await MatchRequestModel.findById(matchResult.matchRequest1Id);
      }

      if (!partnerMatchRequest) {
        throw new Error(`Required partner match of match request: ${matchRequest.id} does not exist.`);
      }

      const partnerUser = await UserModel.findById(partnerMatchRequest.userId);
      matchRequest.partnerUser = partnerUser;


      const acceptedByMe = matchResult.matchRequest1Id === matchRequest.id ? matchResult.acceptedByUser1 : matchResult.acceptedByUser2;
      const acceptedByPartner = matchResult.matchRequest1Id === matchRequest.id ? matchResult.acceptedByUser2 : matchResult.acceptedByUser1;

      if (acceptedByMe === null && acceptedByPartner === null) {
        matchRequest.status = 'matched';
      } else if (acceptedByMe === true && acceptedByPartner === null) {
        matchRequest.status = 'acceptedByMe';
      } else if (acceptedByMe === null && acceptedByPartner === true) {
        matchRequest.status = 'acceptedByPartner';
      } else if (acceptedByMe === false && acceptedByPartner === null) {
        matchRequest.status = 'declinedByMe';
      } else if (acceptedByMe === null && acceptedByPartner === false) {
        matchRequest.status = 'declinedByPartner';
      } else {
        matchRequest.status = 'accepted';
      }
    } else {
      matchRequest.status = 'pending';
    }
  }

  return res.status(200).json(paginationApiResult(matchRequests, paginationResult));
});

export default Router().get('/api/v1/users/:id/matchRequests', authenticateJwt, handler);
