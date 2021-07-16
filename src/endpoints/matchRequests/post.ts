import { Router } from 'express';
import { MatchRequestModel } from '../../db/models/matchRequest';
import { apiResult } from '../../dtos/apiResults';
import { findMatchingMatchRequest } from '../../endpointHelpers/matcher';
import { MatchRequestBody, matchRequestSchema } from '../../endpointHelpers/matchRequest';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { getUserOrThrow } from '../../utils/requestHelpers';

const handler = asyncRequestHandler(async (req, res) => {
  const body = req.body as MatchRequestBody;
  const user = getUserOrThrow(req);
  const matchRequest = new MatchRequestModel({ _id: body.id, userId: user.id, ...body });
  await matchRequest.save();

  findMatchingMatchRequest(matchRequest);
  return res.status(201).json(apiResult(matchRequest.toObject()));
});

export default Router().post(
  '/api/v1/matchRequests',
  authenticateJwt,
  validateRequestBody(matchRequestSchema),
  handler,
);
