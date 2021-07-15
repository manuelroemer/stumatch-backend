import { Router } from 'express';
import { MatchRequestModel } from '../../db/models/matchRequest';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { BadRequestError, NotFoundError } from '../../dtos/apiErrors';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { validateThisUserHasSomeIdOrSomeRole } from '../../utils/roleHelpers';
import { MatchResultModel } from '../../db/models/matchResult';

const handler = asyncRequestHandler(async (req, res) => {
  const id = req.params.id;
  const matchRequest = await MatchRequestModel.findById(id);

  if (!matchRequest) {
    throw new NotFoundError();
  }
  if (matchRequest.matchResultId) {
    const matchResult = await MatchResultModel.findById(matchRequest.matchResultId);
    if (
      (matchResult?.acceptedByUser1 === undefined && matchResult?.acceptedByUser2 === true) ||
      (matchResult?.acceptedByUser1 === true && matchResult?.acceptedByUser2 === undefined) ||
      (matchResult?.acceptedByUser1 === undefined && matchResult?.acceptedByUser2 === undefined)
    ) {
      throw new BadRequestError();
    }
  }

  validateThisUserHasSomeIdOrSomeRole(req, matchRequest.userId, 'admin');
  if (!matchRequest.isDeleted) {
    matchRequest.isDeleted = true;
    matchRequest.save();
  } else {
    throw new BadRequestError();
  }

  return res.sendStatus(204);
});

export default Router().delete('/api/v1/matchRequests/:id', authenticateJwt, handler);
