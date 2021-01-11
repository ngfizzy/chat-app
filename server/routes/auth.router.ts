import { Router, Request, Response } from 'express';
import { authController } from '../controllers/auth.controller';
import { respond } from '../lib';
import { signupValidator, loginValidator } from '../validators';

const authRouter = Router();

authRouter.post('/signup', (req: Request, res: Response) => respond(res)
  .using(authController.signup)
  .withPayload(req.body, signupValidator)
);

authRouter.post('/login', ({body}: Request, res: Response) =>  {
  return respond(res)
    .using(authController.login)
    .withPayload({username: body.username, password: body.password}, loginValidator)
});

export { authRouter };
