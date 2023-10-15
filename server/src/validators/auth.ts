import * as Joi from "joi";

export const loginValidator = {
  body: Joi.object().keys({
    username: Joi.string().required().max(50),
    password: Joi.string().required().min(8),
  }),
};
