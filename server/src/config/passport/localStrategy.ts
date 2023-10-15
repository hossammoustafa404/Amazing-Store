import * as LocalStrategy from "passport-local";
// import type { DoneCallback } from "passport";
import { AppDataSource } from "../db";
import { SiteUser } from "../../entities";
// import { UnAuthorizedError } from "../../lib/errors";
import * as bcrypt from "bcrypt";

const verifyCb = async (username: string, password: string, done: any) => {
  const userSiteRepo = AppDataSource.getRepository(SiteUser);
  const user = await userSiteRepo
    .createQueryBuilder()
    .select("*")
    .where("username = :username", { username })
    .getRawOne();

  if (!user) {
    return done(null, false, { message: "Wrong username" });

    // throw new UnAuthorizedError("Wrong username");
  }

  const isPassMatch = await bcrypt.compare(password, user.password);

  if (!isPassMatch) {
    return done(null, false, { message: "Wrong password" });
    // throw new UnAuthorizedError("Wrong password");
  }

  return done(null, user);
};

const localStrategy = new LocalStrategy.Strategy(verifyCb);

export default localStrategy;
