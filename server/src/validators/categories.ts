import * as Joi from "joi";

/**
 * Validator to create category
 */
export const createCategoryValidator = {
  body: Joi.object().keys({
    name: Joi.string().required().min(3).max(21),
    desc: Joi.string().required().max(255), // Length will be updated
    image: Joi.string().required(),
    parent_category_id: Joi.string().uuid().optional(),
  }),
};

/**
 * Validator to get category
 */
export const getCatregoryValidator = {
  params: Joi.object().keys({
    categoryId: Joi.string().uuid().required(),
  }),
};

/**
 * Validator to get many categories
 */
export const getManyCategoriesValidator = {
  query: Joi.object()
    .keys({
      name: Joi.string().optional().min(3).max(21),
      desc: Joi.string().optional().max(255), // Length will be updated
      image: Joi.string().optional(),
      parent_category_id: Joi.string().uuid().optional(),
    })
    .optional(),
};

/**
 * Validator to update category
 */
export const updateCategoryValidator = {
  params: Joi.object().keys({
    categoryId: Joi.string().uuid().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().optional().min(3).max(21),
      desc: Joi.string().optional().max(255), // Length will be updated
      image: Joi.string().optional(),
      parent_category_id: Joi.string().uuid().optional(),
    })
    .min(1),
};

/**
 * Validator to delete category
 */
export const deleteCategoryValidator = {
  params: Joi.object().keys({
    categoryId: Joi.string().uuid().required(),
  }),
};
