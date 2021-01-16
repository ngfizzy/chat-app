import Joi from 'joi';


export const initConversationValidator = Joi.object({
  recipientId: Joi.string()
    .required(),

  currentUserId: Joi.string()
    .required()
});
