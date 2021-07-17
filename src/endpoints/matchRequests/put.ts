import { Router } from 'express';
import { MatchRequestModel } from '../../db/models/matchRequest';
import { BadRequestError, NotFoundError } from '../../dtos/apiErrors';
import { findMatchingMatchRequest } from '../../endpointHelpers/matcher';
import { MatchRequestBody, matchRequestSchema } from '../../endpointHelpers/matchRequest';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { validateBodyIdMatchesPathId } from '../../middlewares/validateBodyIdMatchesPathId';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { getUserOrThrow } from '../../utils/requestHelpers';
import { validateThisUserHasSomeIdOrSomeRole } from '../../utils/roleHelpers';

const handler = asyncRequestHandler(async (req, res) => {
  const body = req.body as MatchRequestBody;
  const id = req.params.id;
  const user = getUserOrThrow(req);
  const matchRequest = await MatchRequestModel.findById(id);

  if (!matchRequest) {
    throw new NotFoundError();
  }
  if (matchRequest.matchResultId) {
    throw new BadRequestError('This match request can not be edited because it has already a match result.');
  }
  validateThisUserHasSomeIdOrSomeRole(req, user.id!, 'admin');
  matchRequest.facultyId = body.facultyId;
  matchRequest.studyProgramId = body.studyProgramId;
  matchRequest.minSemester = body.minSemester;
  matchRequest.maxSemester = body.maxSemester;
  await matchRequest.save();

  findMatchingMatchRequest(matchRequest);

  return res.sendStatus(204);
});

export default Router().put(
  '/api/v1/matchRequests/:id',
  authenticateJwt,
  validateRequestBody(matchRequestSchema),
  validateBodyIdMatchesPathId(),
  handler,
);
