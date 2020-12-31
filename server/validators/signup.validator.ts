import Joi from 'joi';

export const signupValidator = Joi.object({
  name: Joi.string()
    .min(3)
    .max(60)
    .required(),

  username: Joi.string()
      .pattern(/^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
      .required()
      .error(new Error(
        '"username" must be alphanumeric, cannot contain spaces and must be 3 to 20 characters long'
      )),
 
  password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{5,100}$'))
      .required()
      .error(new Error(
        '"Password" must contain at least one uppercase letter, one symbol and at least 8 characters long'
      )),

  email: Joi.string().email()
});
