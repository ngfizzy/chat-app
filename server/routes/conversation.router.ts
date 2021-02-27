import { Router, Request, Response } from "express";
import { conversationController } from "../controllers/conversation.controller";
import { respond } from "../lib";
import {
  createMessageValidator,
  initConversationValidator,
  getMessagesValidator,
} from "../validators";

const conversationRouter = Router();

conversationRouter.get("/:id", (req: Request, res: Response) => {
  const partiesIds = {
    recipientId: req.params["id"],
    currentUserId: res.locals.user._id!,
  };

  return respond(res)
    .using(conversationController.initConversation)
    .withPayload(partiesIds, initConversationValidator);
});

conversationRouter.get("/", (_: Request, res: Response) => {
  const partiesIds = {
    currentUserId: res.locals.user._id!,
  };

  return respond(res)
    .using(conversationController.getUserConversations)
    .withPayload(partiesIds);
});

conversationRouter.post("/:id/messages", (req: Request, res: Response) => {
  return respond(res)
    .using(conversationController.createMessage)
    .withPayload(
      {
        ...req.body,
        conversationId: req.params.id,
        userId: res.locals.user._id,
      },
      createMessageValidator
    );
});

conversationRouter.get("/:id/messages", (req, res) =>
  respond(res).using(conversationController.getMessages).withPayload(
    {
      conversationId: req.params.id,
      userId: res.locals.user._id,
    },
    getMessagesValidator
  )
);
export { conversationRouter };
