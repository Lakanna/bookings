import Joi from 'joi';

import { emailRegexp } from '../constants/users.js';

// signup
export const authRegisterSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
  role: Joi.string().valid('client', 'business').required(),
  phone: Joi.string().allow(''),

  description: Joi.string().allow(''),
  schedule: Joi.array().items(Joi.string()).default([]),
});

// signin
export const authLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
});
