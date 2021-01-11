import { Router, Request, Response } from 'express';
import { userController } from '../controllers/user.controller';
import { respond } from '../lib';

const userRouter = Router();

userRouter.get('/', (_: Request, res: Response) => respond(res)
  .using(userController.findAllUsers)
  .withPayload()
);

export { userRouter };
