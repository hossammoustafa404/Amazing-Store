import { StatusCodes } from "http-status-codes";
import { getCartService, deleteCartService } from "../services/carts";
import type { Request, Response } from "express";

/**
 * Get Cart Controller
 * @param {Request} req
 * @param {Response} res
 */
export const getCart = async (req: Request, res: Response) => {
  const { cart } = await getCartService(req.params.userId);
  return res.status(StatusCodes.OK).json({ cart });
};

/**
 * Delete Cart Controller
 * @param {Request} req
 * @param {Response} res
 */
export const deleteCart = async (req: Request, res: Response) => {
  await deleteCartService(req.params.userId);
};
