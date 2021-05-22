import { Router } from 'express';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, UserModel } from '../../db/models/user';
import { config } from '../../config';
import { BadRequestError } from '../../errors/apiErrors';
import { asyncRequestHandler } from '../../utils/asyncRequestHandler';

const post = asyncRequestHandler(async (req, res) => {
  const { email, password } = req.body;
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

const router = Router();
router.post('/api/v1/auth/token', post);

export default router;
