import * as Joi from "joi";

export const createCartItemValidator = {
  params: Joi.object().keys({
    userId: Joi.string().uuid().required(),
  }),

  body: Joi.object().keys({
    product_id: Joi.string().uuid().required(),
  }),
};
