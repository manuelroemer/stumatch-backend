import { Router } from 'express';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, UserModel } from '../../../db/models/user';
import { config } from '../../../config';
import { BadRequestError } from '../../../dtos/apiErrors';
import { asyncRequestHandler } from '../../../utils/asyncRequestHandler';
import { SchemaOf, string } from 'yup';
import { object } from 'yup';
import { validateRequestBody } from '../../../middlewares/validateRequestBody';

interface RequestBody {
  email: string;
  password: string;
}

const schema: SchemaOf<RequestBody> = object({
  email: string()
    .defined()
    .max(320)
    .matches(/^\S+@\S+$/),
  password: string().defined(),
}).defined();

const post = asyncRequestHandler(async (req, res) => {
  const { email, password } = req.body as RequestBody;
  const user = await UserModel.findOne({ email }).exec();
  const isValid = user && (await compare(password, user.passwordHash));

  if (!isValid) {
    throw new BadRequestError('Invalid username or password.');
  }

  return res.status(200).json({ access_token: generateJwt(user!), token_type: 'bearer' });
});

function generateJwt(user: User) {
  return jwt.sign({}, config.authJwtSecret, {
    issuer: config.authJwtIssuer,
    subject: user.id,
    expiresIn: '30 days',
  });
}

export default Router().post('/api/v1/auth/token', validateRequestBody(schema), post);
