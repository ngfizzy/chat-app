import { Response } from 'express';
import Joi from 'joi';

class Responder  {
  controllerFn: (...args: any) => any;

  constructor(private res: Response) {} 
  using(controllerFn: (...args: any) => any) {
      if(!controllerFn) {
          throw new Error('Expected a callback function');
      }

      this.controllerFn = controllerFn;
  
      return this; 
  }
  async withPayload<T>(payload: T, validator?: Joi.ObjectSchema)  {

      if(!this.controllerFn) {
          throw new Error('Error: Wrong usage. call responder.using(fn).withPayload(payload)');
      }

      let result;

      if(validator) {
       const validationResult = validator.validate(payload);

       if(validationResult?.error) {
         const { details } = validationResult.error;

        result = {
          message: validationResult.error?.message || details[0].message,
          status: 422,
          error: true,
        }

        return  this.res.status(result.status).json(result);
       }
      }

      try {
        result =  await this.controllerFn(payload);

        if(!result.error) {
            return this.res.json(result);
        }

          return this.res.status(result.status).json(result);
      } catch(e) {
          return this.res.status(500).json({
              error: true,
              message: e.message,
          });
      }
  }
};
export const respond =  (res: Response) => (new Responder(res));
