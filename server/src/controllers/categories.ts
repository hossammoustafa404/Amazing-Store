import type { Request, Response } from "express";
import {
  createCategoryService,
  deleteCategoryService,
  getCategoryService,
  getManyCategoriesService,
  updateCategoryService,
} from "../services/categories";
import { StatusCodes } from "http-status-codes";

/**
 * Create Category Controller
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} response
 */
export const createCategory = async (req: Request, res: Response) => {
  const { category } = await createCategoryService(req.body);
  return res.status(StatusCodes.CREATED).json({ category });
};

/**
 * Get Category By Id Controller
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} response
 */
export const getCategory = async (req: Request, res: Response) => {
  const { category } = await getCategoryService(req.params.categoryId);
  return res.status(StatusCodes.OK).json({ category });
};

export const getManyCategories = async (req: Request, res: Response) => {
  const { categories, categoriesCount } = await getManyCategoriesService(
    req.query
  );
  return res
    .status(StatusCodes.OK)
    .json({ nbhits: categoriesCount, categories });
};
/**
 * Update Category Controller
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} response
 */
export const updateCategory = async (req: Request, res: Response) => {
  const { category } = await updateCategoryService(
    req.params.categoryId,
    req.body
  );
  return res.status(StatusCodes.OK).json({ category });
};

/**
 * Delete Category Controller
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} response
 */
export const deleteCategory = async (req: Request, res: Response) => {
  await deleteCategoryService(req.params.categoryId);
  return res.status(StatusCodes.NO_CONTENT).end();
};
