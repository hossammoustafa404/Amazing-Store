import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { SiteUser } from "../entities";
import { AppDataSource } from "../config/db";
import { RefreshToken } from "../entities";
import { getUserService, updateUserService } from "../services/users";

// Payload Interface
interface Payload {
  userId: string;
}

/**
 * Save Token To DB
 * @param {string} type
 * @param {JWT} token
 * @param {string} userId
 */
export const saveToken = async (
  type: string,
  token: string,
  userId: string
) => {
  // Save refresh token
  if (type === "refresh") {
    const { user } = await getUserService(userId);
    const refTokenRepo = AppDataSource.getRepository(RefreshToken);
    await refTokenRepo
      .createQueryBuilder("refresh_token")
      .insert()
      .values({ site_user: user, token })
      .execute();
  }

  // Save verify token
  if (type === "verify") {
    await updateUserService(userId, {
      verify_token: token,
    });
  }

  // Save reset token
  if (type === "reset") {
    await updateUserService(userId, {
      reset_pass_token: token,
    });
  }
};

/**
 * Generate Authentication tokens (Access Token, Refresh Token)
 * @param payload
 * @returns
 */
export const genAuthTokens = async (payload: Payload) => {
  const {
    jwt: { accessToken, refreshToken },
  } = config;

  // Generate Access Token
  const newAccessToken = jwt.sign(
    { userId: payload.userId },
    accessToken.secret,
    { expiresIn: accessToken.expiresIn }
  );

  // Generate Refresh Token
  const newRefreshToken = jwt.sign(
    { userId: payload.userId },
    refreshToken.secret,
    { expiresIn: refreshToken.expiresIn }
  );

  // Save Refresh Token
  await saveToken("refresh", newRefreshToken, payload.userId);

  // Return Tokens
  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

/**
 * Generate Verify Token
 * @param {Payload} payload
 */
export const genVerifyToken = async (payload: Payload) => {
  const token = jwt.sign(
    { userId: payload.userId },
    config.jwt.verifyToken.secret,
    {
      expiresIn: config.jwt.verifyToken.expiresIn,
    }
  );

  await saveToken("verify", token, payload.userId);

  return { verifyToken: token };
};

/**
 * Generate Reset Token
 * @param {Payload} payload
 */
export const genResetToken = async (payload: Payload) => {
  const token = jwt.sign(
    { userId: payload.userId },
    config.jwt.verifyToken.secret,
    {
      expiresIn: config.jwt.verifyToken.expiresIn,
    }
  );

  await saveToken("reset", token, payload.userId);

  return { resetToken: token };
};
