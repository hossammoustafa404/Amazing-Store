import type { Request, Response } from "express";
import {
  createProductService,
  deleteProductService,
  getManyProductsService,
  getProductService,
  updateProductService,
} from "../services/products";
import { StatusCodes } from "http-status-codes";

/**
 * Create Product Controller
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export const createProduct = async (req: Request, res: Response) => {
  const { product } = await createProductService(
    req.params.categoryId,
    req.body,
    req.files
  );

  return res.status(StatusCodes.CREATED).json({ product });
};

/**
 * Get Product Controller
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} response
 */
export const getProduct = async (req: Request, res: Response) => {
  const { product } = await getProductService(req.params.productId);
  return res.status(StatusCodes.OK).json({ product });
};

/**
 * Get Many Products Controller
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} response
 */
export const getManyProducts = async (req: Request, res: Response) => {
  const { products, productsCount } = await getManyProductsService(
    req.query,
    req.params.categoryId
  );
  return res.status(StatusCodes.OK).json({ nbhits: productsCount, products });
};

/**
 * Update Product Controller
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} response
 */
export const updateProduct = async (req: Request, res: Response) => {
  const { product } = await updateProductService(
    req.params.productId,
    req.body
  );

  return res.status(StatusCodes.OK).json({ product });
};

/**
 * Delete Product Controller
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} response
 */
export const deleteProduct = async (req: Request, res: Response) => {
  await deleteProductService(req.params.productId);

  return res.status(StatusCodes.NO_CONTENT).end();
};
