import type { Request, Response } from "express";
import {
  forgetPasswordService,
  loginService,
  logoutService,
  refreshTokenService,
  registerService,
  resetPasswordService,
  verifyEmailService,
} from "../services/auth";
import { StatusCodes } from "http-status-codes";
import config from "../config/config";
import { SiteUser } from "../entities";

/**
 * Register Controller
 * @param {Request} req
 * @param {Response} res
 */
export const register = async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await registerService(req.body);

  return res
    .status(StatusCodes.CREATED)
    .cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      maxAge: config.jwt.refreshToken.expiresIn,
    })
    .json({
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar,
      },
      accessToken: accessToken,
    });
};

/**
 * Login Controller
 * @param {Request} req
 * @param {Response} res
 */
export const login = async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await loginService(
    req?.user as SiteUser
  );

  return res
    .status(StatusCodes.CREATED)
    .cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      maxAge: config.jwt.refreshToken.expiresIn,
    })
    .json({
      user,
      accessToken: accessToken,
    });
};

/**
 * Refresh Token Controller
 * @param {Request} req
 * @param {Response} res
 */
export const refreshToken = async (req: Request, res: Response) => {
  const { accessToken, refreshToken } = await refreshTokenService(
    req.cookies.refresh_token
  );

  return res
    .status(StatusCodes.OK)
    .cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      maxAge: config.jwt.refreshToken.expiresIn,
    })
    .json({ accessToken });
};

/**
 * Logout Controller
 * @param {Request} req
 * @param {Response} res
 */
export const logout = async (req: Request, res: Response) => {
  await logoutService(req.cookies.refresh_token);
  return res
    .status(StatusCodes.NO_CONTENT)
    .clearCookie("refresh_token", {
      httpOnly: true,
      sameSite: "none",
      maxAge: config.jwt.refreshToken.expiresIn,
    })
    .end();
};

/**
 * Verify Email Controller
 * @param {Request} req
 * @param {Response} res
 */
export const verifyEmail = async (req: Request, res: Response) => {
  const { user } = await verifyEmailService(req.params.verifyToken);
  return res.status(StatusCodes.OK).json({ user });
};

/**
 * Forget Password Controller
 * @param {Request} req
 * @param {Response} res
 */
export const forgetPassword = async (req: Request, res: Response) => {
  const { message } = await forgetPasswordService(req.query.email as string);
  return res.status(StatusCodes.OK).json({ message });
};

/**
 * Reset Password Controller
 * @param {Request} req
 * @param {Response} res
 */
export const resetPassword = async (req: Request, res: Response) => {
  const { user } = await resetPasswordService(req.params.resetToken, req.body);
  return res.status(StatusCodes.OK).json({ user });
};
