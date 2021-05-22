import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions as JwtStrategyOptions } from 'passport-jwt';
import { config } from '../config';
import { UserModel } from '../db/models/user';

const jwtStrategyOptions: JwtStrategyOptions = {
  issuer: config.authJwtIssuer,
  secretOrKey: config.authJwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new JwtStrategy(jwtStrategyOptions, async (payload, done) => {
    const user = await UserModel.findById(payload.sub);
    return done(null, user ? user : false);
  }),
);
