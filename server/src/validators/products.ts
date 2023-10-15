import * as Joi from "joi";

/**
 * Validator To Create Product
 */
export const createProductValidator = {
  params: Joi.object().keys({
    categoryId: Joi.string().uuid().required(),
  }),
  body: {
    name: Joi.string().required().max(50),
    desc: Joi.string().required().max(255),
    price: Joi.number().required().min(0),
    SKU: Joi.string().required(),
    qty_in_stock: Joi.number().required().min(0),
  },
};

/**
 * Validator To Get Product By Id
 */
export const getProductValidator = {
  params: Joi.object().keys({
    productId: Joi.string().uuid().required(),
  }),
};

/**
 * Validator To Get Many Products
 */
export const getManyProductsValidator = {
  params: Joi.object().keys({
    categoryId: Joi.string().uuid().optional(),
  }),

  query: Joi.object().keys({
    name: Joi.string().optional().max(50),
    desc: Joi.string().optional().max(255),
    price: Joi.number().optional().min(0),
    SKU: Joi.string().optional(),
    qty_in_stock: Joi.number().optional().min(0),
    category_id: Joi.string().uuid().optional(),
  }),
};

/**
 * Validator To Update Product By Id
 */
export const updateProductValidator = {
  params: Joi.object().keys({
    productId: Joi.string().uuid().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().optional().max(50),
    desc: Joi.string().optional().max(255),
    price: Joi.number().optional().min(0),
    SKU: Joi.string().optional(),
    qty_in_stock: Joi.number().optional().min(0),
  }),
};

/**
 * Validator To Delete Product By Id
 */
export const deleteProductValidator = {
  params: Joi.object().keys({
    productId: Joi.string().uuid().required(),
  }),
};
