import { Router, Request, Response } from 'express';
import { conversationController } from '../controllers/conversation.controller';
import { respond } from '../lib';

const conversationRouter = Router();

conversationRouter.get('/:id', (req: Request, res: Response) =>{
  const partiesIds = {
      recipientId: req.params['id'], 
      currentUserId: res.locals.user._id!
  };

  return respond(res)
  .using(conversationController.initConversation)
  .withPayload(partiesIds);
} 
);

export { conversationRouter };
