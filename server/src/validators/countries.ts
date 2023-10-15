import * as Joi from "joi";

// Shared Validator
const paramsValidator = Joi.object().keys({
  countryId: Joi.string().uuid().required(),
});

/**
 * Validator to create country
 */
export const createCountryValidator = {
  body: Joi.object().keys({
    name: Joi.string().required().max(50),
  }),
};

/**
 * Update country validator
 */
export const UpdateCountryValidator = {
  params: paramsValidator,
  body: Joi.object()
    .keys({
      name: Joi.string().optional().max(50),
    })
    .min(1),
};

/**
 * Validator to delete country
 */
export const deleteCountryValidator = {
  params: paramsValidator,
};
