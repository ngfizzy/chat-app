import { boundClass } from "autobind-decorator";

import {
  ConversationResponse,
  ConversationsResponse,
  IMessage,
  MessageResponse,
  IUser,
  MessagesResponse,
} from "../../types/models";
import {
  Conversation,
  User,
  Message,
  ConversationDoc,
  MessageDoc,
} from "../models";

@boundClass
export class ConversationController {
  constructor(
    private conversation: typeof Conversation,
    private user: typeof User,
    private message: typeof Message
  ) {}

  async initConversation({
    recipientId,
    currentUserId,
  }: {
    recipientId: string;
    currentUserId: string;
  }): Promise<ConversationResponse> {
    try {
      const recipient = await this.user.findById(recipientId);
      const me = await this.user.findById(currentUserId);

      // console.log("me>>>>>>>>>>>>>>", me);
      // console.log("recipient>>>>>>>+++", recipient);
      const parties = [];

      const userError = {
        error: true,
        message: "user not found",
        conversation: null,
        status: 422,
      };

      if (me) {
        parties.push(me);
      } else {
        return userError;
      }

      if (recipient) {
        parties.push(recipient);
      } else {
        return userError;
      }

      let conversation = await this.conversation
        .findOne({ parties: { $all: parties, $size: 2 } })
        .populate({ path: "parties", model: "User" });
      let shouldCreateSelfConvo = false;

      if (conversation) {
        const { parties: foundParties } = conversation;
        const isSelfConvo =
          parties[0]._id?.toString() === parties[1]._id?.toString();
        const foundSelfConvo =
          foundParties[0]._id?.toString() === foundParties[1]._id?.toString();
        shouldCreateSelfConvo = isSelfConvo !== foundSelfConvo;
      }

      if (shouldCreateSelfConvo || !conversation) {
        conversation = new this.conversation();

        conversation.parties = parties;
        me.conversations?.push(conversation);
        recipient.conversations?.push(conversation);

        await me.save();
        await recipient.save();
        await conversation.save();

        conversation = await this.conversation
          .findById(conversation._id)
          .populate({ path: "parties", model: "User" });
      }

      return {
        conversation,
        error: false,
        message: "success",
        status: 200,
      };
    } catch {
      return {
        error: true,
        message: "something went wrong",
        status: 500,
        conversation: null,
      };
    }
  }

  async getUserConversations({
    currentUserId,
  }: {
    currentUserId: string;
  }): Promise<ConversationsResponse> {
    try {
      const currentUser = await this.user.findById(currentUserId);
      if (currentUser) {
        const conversations = await this.conversation
          .find({ parties: { $in: [currentUser] } })
          .populate({
            path: "parties",
            model: "User",
          })
          .sort({ updatedAt: -1 });

        return {
          conversations: conversations || [],
          error: false,
          status: 200,
          message: "conversations fetches successfully",
        };
      }

      return {
        conversations: [],
        error: false,
        status: 404,
        message: "Could not find current user",
      };
    } catch {
      return {
        message: "something went wrong",
        error: true,
        status: 500,
        conversations: [],
      };
    }
  }

  async createMessage(
    message: IMessage & { userId: any; conversationId: string }
  ): Promise<MessageResponse> {
    try {
      const conversation = await this.conversation
        .findById(message.conversationId)
        .populate({
          path: "parties",
          model: "User",
        });
      const error = this.verifyOwnership(
        message.userId,
        conversation
      ) as MessageResponse;

      if (error) {
        return error;
      }

      message.author = (await this.user.findById(message.userId)) as IUser;
      message.conversation = conversation;

      let chatMessage = new this.message(message);

      conversation!.messages.push(chatMessage!);
      conversation!.lastMessage = chatMessage!;

      chatMessage = await chatMessage.save();
      await conversation!.save();

      chatMessage = (await this.message.findById(chatMessage._id).populate({
        path: "author",
        model: "User",
      })) as MessageDoc;

      return {
        chatMessage,
        error: false,
        status: 200,
        message: "chat sent successfully",
      };
    } catch (e) {
      return {
        chatMessage: null,
        error: false,
        status: 500,
        message: "an error occurred while sending",
      };
    }
  }

  async getMessages({
    userId,
    conversationId,
  }: {
    userId: string;
    conversationId: string;
  }): Promise<MessagesResponse> {
    try {
      let conversation = await this.conversation
        .findById(conversationId)
        .populate({
          path: "messages",
          model: "Message",
          populate: {
            path: "author",
            model: "User",
          },
        })
        .populate({
          path: "parties",
          model: "User",
        });

      const error = this.verifyOwnership(
        userId,
        conversation
      ) as MessagesResponse;

      if (error) {
        return error;
      }

      return {
        chatMessages: conversation?.messages || [],
        error: false,
        message: "success",
        status: 200,
      };
    } catch (e) {
      return {
        chatMessages: [],
        error: false,
        status: 500,
        message: "an error occurred while sending",
      };
    }
  }

  verifyOwnership(userId: any, conversation?: ConversationDoc | null) {
    if (!conversation) {
      return {
        message: "message can only occur in a conversation",
        status: 422,
        error: true,
      };
    }

    if (!conversation.parties.some((party) => party.id === userId)) {
      return {
        message: "Forbidden",
        status: 403,
        error: true,
      };
    }

    return null;
  }
}

export const conversationController = new ConversationController(
  Conversation,
  User,
  Message
);
