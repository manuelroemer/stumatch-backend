import { Router } from 'express';
import { MatchRequestModel } from '../../db/models/matchRequest';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { NotFoundError } from '../../dtos/apiErrors';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { validateThisUserHasSomeIdOrSomeRole } from '../../utils/roleHelpers';

const handler = asyncRequestHandler(async (req, res) => {
  const id = req.params.id;
  const matchRequest = await MatchRequestModel.findOne({ _id: id, isDeleted: false });

  if (!matchRequest) {
    throw new NotFoundError();
  }

  validateThisUserHasSomeIdOrSomeRole(req, matchRequest.userId, 'admin');
  matchRequest.isDeleted = true;
  await matchRequest.save();

  return res.sendStatus(204);
});

export default Router().delete('/api/v1/matchRequests/:id', authenticateJwt, handler);
