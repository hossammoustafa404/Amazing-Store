import type { Request, Response } from "express";
import {
  createCountryService,
  getManyCountriesService,
  updateCountryService,
} from "../services/countries";
import { StatusCodes } from "http-status-codes";

/**
 * Create Country Controller
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} response
 */
export const createCountry = async (req: Request, res: Response) => {
  const { country } = await createCountryService(req.body);
  return res.status(StatusCodes.CREATED).json({ country });
};

/**
 * Get Many Countries Controller
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} response
 */
export const getManyCountries = async (req: Request, res: Response) => {
  const { countries, countriesCount } = await getManyCountriesService();
  return res.status(StatusCodes.OK).json({ nbhits: countriesCount, countries });
};

/**
 * Update Country By Id Controller
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} response
 */
export const updateCountry = async (req: Request, res: Response) => {
  const { country } = await updateCountryService(
    req.params.countryId,
    req.body
  );

  return res.status(StatusCodes.OK).json({ country });
};
