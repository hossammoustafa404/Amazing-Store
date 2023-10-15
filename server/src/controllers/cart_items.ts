import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createCartItemService,
  deleteCartItemService,
  updateCartItemService,
} from "../services/cart_items";

/**
 * Create Cart Item Controller
 * @param {Request} req
 * @param {Response} res
 */
export const createCartItem = async (req: Request, res: Response) => {
  const { cartItem } = await createCartItemService(req.params.userId, req.body);
  return res.status(StatusCodes.OK).json({ cartItem });
};

/**
 * Update Cart Item Controller
 * @param {Request} req
 * @param {Response} res
 */
export const updateCartItem = async (req: Request, res: Response) => {
  const { cartItem } = await updateCartItemService(
    req.params.cartItemId,
    req.body
  );

  return res.status(StatusCodes.OK).json({ cartItem });
};

/**
 * Delete Cart Item Controller
 * @param {Request} req
 * @param {Response} res
 */
export const deleteCartItem = async (req: Request, res: Response) => {
  await deleteCartItemService(req.params.cartItemId);

  return res.status(StatusCodes.NO_CONTENT).end();
};
