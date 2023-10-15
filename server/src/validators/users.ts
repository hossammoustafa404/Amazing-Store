// Imports
import * as Joi from "joi";
import { userRoles } from "../entities/site_user";

// Params Validator
const paramsValidator = Joi.object().keys({
  userId: Joi.string().uuid().required(),
});

// Create User Validator
export const createUserValidator = {
  body: Joi.object().keys({
    first_name: Joi.string().required().max(21),
    last_name: Joi.string().required().max(21),
    username: Joi.string().required().max(50),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
};

// Get User Validator
export const getUserValidator = {
  params: paramsValidator,
};

// Update User validator
export const updateUserValidator = {
  params: paramsValidator,

  body: Joi.object().keys({
    first_name: Joi.string().optional().max(21),
    last_name: Joi.string().optional().max(21),
    username: Joi.string().optional().max(50),
    email: Joi.string().email().optional(),
    password: Joi.string().optional().min(8),
    role: Joi.string()
      .optional()
      .valid(...userRoles), // restricted to super admin
    avatar: Joi.string().optional(),
  }),
};

// Delete User Validator
export const deleteUserValidator = {
  params: paramsValidator,
};
