import { Router, Request, Response } from 'express';
import { searchController } from '../controllers/search.controller';
import { respond } from '../lib';
import { searchValidator } from '../validators';

const searchRouter = Router();

searchRouter.post('/user', (req: Request, res: Response) => respond(res)
  .using(searchController.searchUser)
  .withPayload(req.query, searchValidator)
);


export { searchRouter };
