import * as Joi from "joi";

/**
 * Validator to create address
 */
export const createAddressValidator = {
  body: Joi.object().keys({
    unit_number: Joi.string().required(),
    street_number: Joi.string().required(),
    address_line1: Joi.string().required(),
    address_line2: Joi.string().required(),
    city: Joi.string().required(),
    region: Joi.string().required(),
    postal_code: Joi.string().required(),
    country_id: Joi.string().uuid().required(),
  }),
};

/**
 * Validator to get address by id
 */
export const getAddressValidator = {
  params: Joi.object().keys({
    addressId: Joi.string().uuid().required(),
  }),
};

/**
 * Validator to get many addresses
 */
export const getManyAddressesValidator = {
  query: Joi.object()
    .keys({
      unit_number: Joi.string().optional(),
      street_number: Joi.string().optional(),
      address_line1: Joi.string().optional(),
      address_line2: Joi.string().optional(),
      city: Joi.string().optional(),
      region: Joi.string().optional(),
      postal_code: Joi.string().optional(),
      country_id: Joi.string().uuid().optional(),
    })
    .optional(),
};

export const updateAddressValidator = {
  params: Joi.object().keys({
    addressId: Joi.string().uuid().required(),
  }),
  body: Joi.object().keys({
    unit_number: Joi.string().optional(),
    street_number: Joi.string().optional(),
    address_line1: Joi.string().optional(),
    address_line2: Joi.string().optional(),
    city: Joi.string().optional(),
    region: Joi.string().optional(),
    postal_code: Joi.string().optional(),
    country_id: Joi.string().uuid().optional(),
  }),
};
