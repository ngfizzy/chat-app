import { Router, Request, Response } from 'express';
import {
  conversationController,
} from '../controllers/conversation.controller';
import { respond } from '../lib';
import { initConversationValidator } from '../validators';

const conversationRouter = Router();

conversationRouter.get('/:id', (req: Request, res: Response) => {
  const partiesIds = {
      recipientId: req.params['id'], 
      currentUserId: res.locals.user._id!
  };

  return respond(res)
    .using(conversationController.initConversation)
    .withPayload(partiesIds, initConversationValidator);
  
});

conversationRouter.get('/', (_: Request, res: Response) => {
  const partiesIds = {
      currentUserId: res.locals.user._id!
  };

  return respond(res)
    .using(conversationController.getUserConversations)
    .withPayload(partiesIds);
});

export { conversationRouter };
