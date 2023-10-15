import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createAddressService,
  getAddressService,
  getManyAddressesService,
  updateUserAddressService,
} from "../services/addresses";
import { SiteUser } from "../entities";

/**
 * Create Address Controller
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export const createAddress = async (req: Request, res: Response) => {
  const { address } = await createAddressService(
    req.body,
    req.user as SiteUser
  );

  return res.status(StatusCodes.CREATED).json({ address });
};

/**
 * Get Address By Id Controller
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export const getAddress = async (req: Request, res: Response) => {
  const { address } = await getAddressService(req.params.addressId);

  return res.status(StatusCodes.OK).json({ address });
};

/**
 * Get Many Addresses Controller
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export const getManyAddresses = async (req: Request, res: Response) => {
  const { addresses, addressesCount } = await getManyAddressesService(
    req.query
  );

  return res.status(StatusCodes.OK).json({ nbhits: addressesCount, addresses });
};

export const updateUserAddress = async (req: Request, res: Response) => {
  const { id: userId } = req.user as SiteUser;
  const { address } = await updateUserAddressService(
    req.params.addressId,
    req.body
  );

  return res.status(StatusCodes.OK).json({ address });
};
