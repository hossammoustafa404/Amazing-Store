import { NotFoundError } from "../lib/errors";
import { AppDataSource } from "../config/db";
import { Category } from "../entities";
import {
  CategoryFilterQuery,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "../interfaces/categories";
import exclude from "../lib/exclude";

/**
 * Create Category Service
 * @param {CreateCategoryDto} createCategoryDto
 * @returns {{category:Category}} result object
 */
export const createCategoryService = async (
  createCategoryDto: CreateCategoryDto
) => {
  // Get Parent Category
  let parentCategory = null;
  if (createCategoryDto.parent_category_id) {
    const parentCategoryRepo = AppDataSource.getRepository(Category);
    parentCategory = await parentCategoryRepo
      .createQueryBuilder("parent_category")
      .select("*")
      .where("parent_category.id = :parentCategoryId", {
        parentCategoryId: createCategoryDto.parent_category_id,
      })
      .getRawOne();

    // Throw error if parent category does not exist
    if (!parentCategory) {
      throw new NotFoundError("Parent category does not found");
    }

    createCategoryDto = exclude(["parent_category_id"], createCategoryDto);
  }

  // Create Category
  const category = new Category();
  Object.assign(category, createCategoryDto, {
    parent_category: parentCategory,
  });

  // Save Category
  const categoryRepo = AppDataSource.getRepository(Category);
  await categoryRepo.save(category);

  return { category };
};

/**
 * Get Category By Id Service
 * @param {string} categoryId
 * @returns {{category:Category}} result object
 */
export const getCategoryService = async (categoryId: string) => {
  // Get Category
  const categoryRepo = AppDataSource.getRepository(Category);
  const category = await categoryRepo
    .createQueryBuilder("category")
    .leftJoinAndSelect("category.parent_category", "parent_category")
    .leftJoinAndSelect("category.sub_categories", "subcategory")
    .where("category.id = :categoryId", { categoryId })
    .getOne();

  // Throw error if category does not exist
  if (!category) {
    throw new NotFoundError("Category does not exist");
  }

  return { category };
};

/**
 * Get Many Categories Service
 * @param {CateoryFilterQuery} filterQuery
 * @returns {{categories:Category[], categoriesCount:number}} result object
 */
export const getManyCategoriesService = async (
  filterQuery?: CategoryFilterQuery
) => {
  // Get Parent Category
  let parentCategory = null;
  if (filterQuery && filterQuery.parent_category_id) {
    const parentCategoryRepo = AppDataSource.getRepository(Category);
    parentCategory = await parentCategoryRepo
      .createQueryBuilder("parent_category")
      .select("*")
      .where("parent_category.id = :parentCategoryId", {
        parentCategoryId: filterQuery.parent_category_id,
      })
      .getRawOne();

    console.log(parentCategory);

    filterQuery = exclude(["parent_category_id"], filterQuery);
  }
  // Prepare Filter Query
  let dbQuery = {};
  if (filterQuery) {
    dbQuery = filterQuery;
  }

  // Get Categories
  // Need to check and update logic for correct query
  const categoryRepo = AppDataSource.getRepository(Category);
  const [categories, count] = await categoryRepo.findAndCount({
    ...dbQuery,
    relations: { parent_category: true, sub_categories: true },
  });

  return { categories, categoriesCount: count };
};

/**
 * Update Category Service
 * @param {string} categoryId
 * @param {UpdateCategoryDto} updateCategoryDto
 * @returns {{category:Category}} result object
 */
export const updateCategoryService = async (
  categoryId: string,
  updateCategoryDto: UpdateCategoryDto
) => {
  // Get Parent Category
  let parentCategory = null;
  if (updateCategoryDto.parent_category_id) {
    const parentCategoryRepo = AppDataSource.getRepository(Category);
    parentCategory = await parentCategoryRepo
      .createQueryBuilder("parent_category")
      .select("*")
      .where("parent_category.id = :parentCategoryId", {
        parentCategoryId: updateCategoryDto.parent_category_id,
      })
      .getRawOne();

    // Throw error if parent category does not exist
    if (!parentCategory) {
      throw new NotFoundError("Parent category does not exist");
    }

    updateCategoryDto = exclude(["parent_category_id"], updateCategoryDto);
  }

  // Get Category
  const categoryRepo = AppDataSource.getRepository(Category);
  let category = await categoryRepo
    .createQueryBuilder("category")
    .select("*")
    .where("category.id = :categoryId", { categoryId })
    .getRawOne();

  // Throw error if category does not exist
  if (!category) {
    throw new NotFoundError("Category not found");
  }

  // Update Category And Save
  category = {
    ...category,
    ...updateCategoryDto,
    parent_category: parentCategory,
  };
  await categoryRepo.save(category);

  return { category };
};

/**
 * Delete Category Service
 * @param {string} categoryId
 * @returns {void} undefined

 */
export const deleteCategoryService = async (categoryId: string) => {
  // Get Category
  const categoryRepo = AppDataSource.getRepository(Category);
  let category = await categoryRepo
    .createQueryBuilder("category")
    .select("*")
    .where("category.id = :categoryId", { categoryId })
    .getRawOne();

  console.log(category);

  // Throw error if category does not exist
  if (!category) {
    throw new NotFoundError("Category does not exist");
  }

  // Delete Category
  await categoryRepo.remove(category);

  return;
};
