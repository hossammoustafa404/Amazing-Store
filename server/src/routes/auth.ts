import * as express from "express";
import {
  forgetPassword,
  login,
  logout,
  refreshToken,
  register,
  resetPassword,
  verifyEmail,
} from "../controllers/auth";
import validate from "../middlewares/validate";
import { createUserValidator } from "../validators/users";
import { loginValidator } from "../validators/auth";
import * as passport from "passport";
import protect from "../middlewares/protect";

const router = express.Router();

// Register Route
router.route("/register").post(validate(createUserValidator), register);

// Login Route
router
  .route("/login")
  .post(
    validate(loginValidator),
    passport.authenticate("local", { session: false }),
    login
  );

// Refresh Token Route
router.route("/refresh").post(refreshToken);

// Logout Service
router.route("/logout").delete(protect(), logout);

// Verfiy Email Route
router.get("/verify_email/:verifyToken", verifyEmail);

// Forget Password Route
router.get("/forget_password", forgetPassword);

// Reset Password Route
router.patch("/reset_password/:resetToken", resetPassword);

export default router;
