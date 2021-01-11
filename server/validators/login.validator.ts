import Joi from 'joi';

export const loginValidator = Joi.object({
    username: Joi.string(),
    password: Joi.string()
  });
