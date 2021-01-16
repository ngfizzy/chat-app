import Joi from 'joi';

export const createMessageValidator = Joi.object({
  conversationId: Joi.string().required(),
  text: Joi.string().required(),
  userId: Joi.string().required(),
});
