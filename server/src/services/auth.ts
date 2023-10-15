import { CreateUserDto } from "../interfaces/users";
import { createUserService, getUserService, updateUserService } from "./users";
import { genAuthTokens, genResetToken, genVerifyToken } from "../lib/tokens";
import { RefreshToken, SiteUser } from "../entities";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { AppDataSource } from "../config/db";
import {
  ForbiddenError,
  NotFoundError,
  UnAuthorizedError,
} from "../lib/errors";
import { sendResetPassMail, sendVerifyMail } from "../lib/nodemailer";
import { ResetPasswordDto } from "../interfaces/auth";

// Repos
const refTokenRepo = AppDataSource.getRepository(RefreshToken);
const siteUserRepo = AppDataSource.getRepository(SiteUser);

/**
 * Register Service
 * @param {CreateUserDto} createUserDto
 */
export const registerService = async (createUserDto: CreateUserDto) => {
  // Create user
  const { user } = await createUserService(createUserDto);

  // Generate authentication tokens (Access Token, Refresh Token)
  const { accessToken, refreshToken } = await genAuthTokens({
    userId: user.id,
  });

  // Send verify mail
  const { verifyToken } = await genVerifyToken({ userId: user.id });
  await sendVerifyMail(user, verifyToken);

  return { user, accessToken, refreshToken };
};

/**
 * Login Service
 * @param {SiteUser} siteUser
 */
export const loginService = async (siteUser: SiteUser) => {
  const { accessToken, refreshToken } = await genAuthTokens({
    userId: siteUser.id,
  });

  const { id, first_name, last_name, avatar, role } = siteUser;

  return {
    user: { id, first_name, last_name, avatar, role },
    accessToken,
    refreshToken,
  };
};

/**
 * Refresh Token Service
 * @param refToken
 */
export const refreshTokenService = async (refToken: string | undefined) => {
  // Throw an error if refresh token cookie does not exist
  if (!refToken) {
    throw new UnAuthorizedError("Refresh token cookie must be provided");
  }

  // Verify token
  let decode: any;
  try {
    decode = jwt.verify(refToken, config.jwt.refreshToken.secret);
  } catch (error) {
    throw new UnAuthorizedError("Refresh token has expired");
  }

  // Reuse detection
  const token = await refTokenRepo
    .createQueryBuilder("refresh_token")
    .where("refresh_token.token = :refToken", { refToken })
    .getOne();

  // Attack if refresh token is valid and does not exist in Database. Delete all refresh tokens related to the hacked user
  if (!token) {
    await refTokenRepo
      .createQueryBuilder("refresh_token")
      .delete()
      .where("refresh_token.site_user_id = :userId", { userId: decode.userId })
      .execute();

    throw new UnAuthorizedError("Refresh token has been used one time before");
  }

  // Remove old refresh token from database
  await refTokenRepo.remove(token);

  // Generate new auth tokens
  const { accessToken, refreshToken } = await genAuthTokens({
    userId: decode.userId,
  });

  return { accessToken, refreshToken };
};

/**
 * Logout Service
 * @param {RefreshToken} refToken
 */
export const logoutService = async (refToken: string) => {
  // Throw an error if refresh token cookie does not exist
  if (!refToken) {
    throw new UnAuthorizedError("Refresh token cookie must be provided");
  }

  // Remove refresh token from database
  await refTokenRepo
    .createQueryBuilder("refresh_token")
    .delete()
    .where("refresh_token.token = :refToken", { refToken })
    .execute();

  return;
};

/**
 * Verify Email Service
 * @param {string} token
 */
export const verifyEmailService = async (token: string) => {
  // Verify token
  try {
    const decode: any = jwt.verify(token, config.jwt.verifyToken.secret);

    // Reuse detection
    const searchedUser = await siteUserRepo
      .createQueryBuilder("site_user")
      .where("site_user.verify_token = :token", { token })
      .getOne();

    if (!searchedUser) {
      throw new ForbiddenError(
        "No user is attached to the token. User may be deleted or token has been used one before"
      );
    }

    // Update user status (verified) and invalid verify token
    const { user } = await updateUserService(decode.userId, {
      email_verified: true,
      verify_token: null,
    });

    return { user };
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new ForbiddenError("Token has been expired");
    }
    throw error;
  }
};

/**
 * Forget Password Service
 * @param {string} email
 */
export const forgetPasswordService = async (email: string) => {
  // Get user by email
  const user = await siteUserRepo
    .createQueryBuilder("site_user")
    .where("site_user.email = :email", { email })
    .getOne();

  // Throw an error if user does not exist
  if (!user) {
    throw new NotFoundError("User does not exist");
  }

  // Generate reset password token
  const { resetToken } = await genResetToken({ userId: user.id });

  // Send reset password mail
  await sendResetPassMail(user, resetToken);

  return { message: "Reset password link has been sent to your email" };
};

/**
 *
 * @param {string} token
 * @param {ResetPasswordDto} resetPasswordDto
 * @returns
 */
export const resetPasswordService = async (
  token: string,
  resetPasswordDto: ResetPasswordDto
) => {
  // Verify token
  try {
    const decode: any = jwt.verify(token, config.jwt.resetToken.secret);

    // Reuse detection
    const searchedUser = await siteUserRepo
      .createQueryBuilder("site_user")
      .where("site_user.reset_pass_token = :token", { token })
      .getOne();

    if (!searchedUser) {
      throw new NotFoundError(
        "No user is attached to the token. User may be deleted or token has been used one before"
      );
    }

    // Update user password and invalid reset token
    const { user } = await updateUserService(decode.userId, {
      password: resetPasswordDto.password,
      reset_pass_token: null,
    });

    return { user };
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      throw new ForbiddenError("Token has expired");
    }
    throw err;
  }
};
