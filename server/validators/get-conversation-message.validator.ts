import Joi from 'joi';


export const getConversations = Joi.object({
  conversationId: Joi.string()
    .required(),
  userId: Joi.string()
    .required()
});
