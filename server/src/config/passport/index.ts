import * as passport from "passport";
import localStrategy from "./localStrategy";
import jwtStrategy from "./jwtStraregy";

export default () => {
  passport.use(localStrategy);
  passport.use(jwtStrategy);
};
