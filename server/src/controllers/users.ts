// Imports
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createUserService,
  deleteUserService,
  getManyUsersService,
  getUserService,
  updateUserService,
} from "../services/users";
import { SiteUser } from "src/entities";

/**
 * Create User Controller
 * @param {Request} req
 * @param {Response} res
 */
export const createUser = async (req: Request, res: Response) => {
  const { user } = await createUserService(req.body);
  return res.status(StatusCodes.CREATED).json({ user });
};

/**
 * Get User Controller
 * @param {Request} req
 * @param {Response} res
 */
export const getUser = async (req: Request, res: Response) => {
  const { user } = await getUserService(req.params.userId);
  return res.status(StatusCodes.OK).json({ user });
};

/**
 * Get Many Users Controller
 * @param {Request} req
 * @param {Response} res
 */
export const getManyUsers = async (req: Request, res: Response) => {
  const { metadata, users } = await getManyUsersService(req.query);
  return res.status(StatusCodes.OK).json({ metadata, users });
};

/**
 * Update User Controller
 * @param {Request} req
 * @param {Response} res
 */
export const updateUser = async (req: Request, res: Response) => {
  const { user } = await updateUserService(
    req.params.userId,
    req.body,
    req.file,
    req.user as SiteUser
  );

  return res.status(StatusCodes.OK).json({ user });
};

/**
 * Delete User Controller
 * @param {Request} req
 * @param {Response} res
 */
export const deleteUser = async (req: Request, res: Response) => {
  await deleteUserService(req.params.userId);
  return res.status(StatusCodes.NO_CONTENT).end();
};
