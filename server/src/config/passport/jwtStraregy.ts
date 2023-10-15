import * as JwtStrategy from "passport-jwt";
import type { StrategyOptions, VerifyCallback } from "passport-jwt";
import config from "../config";
import { SiteUser } from "../../entities";
import { AppDataSource } from "../db";

const options: StrategyOptions = {
  jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.accessToken.secret,
};

const verifyCb: VerifyCallback = async (payload, done) => {
  const { userId } = payload;

  const userRepo = AppDataSource.getRepository(SiteUser);
  const user = await userRepo
    .createQueryBuilder()
    .select("*")
    .where("id = :userId", { userId })
    .getRawOne();

  if (!user) {
    return done(null, false);
  }

  return done(null, user);
};

const jwtStrategy = new JwtStrategy.Strategy(options, verifyCb);

export default jwtStrategy;
