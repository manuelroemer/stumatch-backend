import { Router } from 'express';
import { object, string, array } from 'yup';
import { UserModel, UserRole } from '../../db/models/user';
import { NotFoundError } from '../../dtos/apiErrors';
import { apiResult } from '../../dtos/apiResults';
import { authenticateJwt } from '../../middlewares/authenticateJwt';
import { validateBodyIdMatchesPathId } from '../../middlewares/validateBodyIdMatchesPathId';
import { validateRequestBody } from '../../middlewares/validateRequestBody';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';
import { validateThisUserHasSomeRole } from '../../utils/roleHelpers';

export interface UserPutBody {
  id?: string;
  roles: Array<UserRole>;
}

const schema = object({
  id: string().uuid(),
  roles: array()
    .of(string().required().oneOf(['student', 'admin', 'advertiser', 'globalContentManager']))
    .required(),
}).defined();

const handler = asyncRequestHandler(async (req, res) => {
  const body = req.body as UserPutBody;
  const id = req.params.id;
  const user = await UserModel.findById(id);
  if (!user) {
    throw new NotFoundError();
  }

  validateThisUserHasSomeRole(req, 'admin');

  user.roles = body.roles;

  await user.save();
  return res.status(200).json(apiResult(await user.toObject()));
});

export default Router().put(
  '/api/v1/users/:id',
  authenticateJwt,
  validateRequestBody(schema),
  validateBodyIdMatchesPathId(),
  handler,
);
