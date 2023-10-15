import * as passport from "passport";
import type { Authenticator } from "passport";

/**
 * Protect Route Middleware
 * @returns {Authenticator} passport authenticator middleware
 */
const protect = () => passport.authenticate("jwt", { session: false });

export default protect;
