import Joi from 'joi';

export const searchValidator = Joi.object({
   q: Joi.string().required()
  });
