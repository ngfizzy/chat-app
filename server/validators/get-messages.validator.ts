import Joi from 'joi';

export const getMessagesValidator = Joi.object({
  conversationId: Joi.string().required(),
  userId: Joi.string().required(),
});
