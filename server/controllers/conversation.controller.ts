
import { boundClass } from 'autobind-decorator';

import { ConversationResponse, ConversationsResponse } from '../../types/models';
import { Conversation, User } from '../models';


@boundClass
export class ConversationController {
  constructor(private conversation: typeof Conversation, private user: typeof User) {}

  async initConversation({
      recipientId,
      currentUserId
  }: {recipientId: string; currentUserId: string;}): Promise<ConversationResponse> {
      currentUserId
    try {
      const recipient = await this.user.findById(recipientId);
      const me = await this.user.findById(currentUserId);
      const parties = [];

      const userError = {
        error: true,
        message: 'user not found',
        conversation: null,
        status: 422
      };

      if(me) {
        parties.push(me);
      } else {
        return userError;
      }

      if(recipient){
        parties.push(recipient);
      } else {
        return userError;
      }


      let conversation = await this.conversation.findOne({
        parties
      });


      if(!conversation) {
        conversation = await this.conversation.create({ parties, messages: [] });
        me.conversations?.push(conversation);
        recipient.conversations?.push(conversation);
        await me.save();
        await recipient.save()
      }

      return {
        conversation,
        error: false, 
        message: 'success',
        status: 200,
      };
    } catch {
      return {
        error: true,
        message: 'something went wrong',
        status: 500,
        conversation: null,
      };
    }
  }

  async getUserConversations(
    {currentUserId}: {currentUserId: string}
  ): Promise<ConversationsResponse> {
    try {
      const currentUser = await this.user.findById(currentUserId);
      if(currentUser) {
        // const {conversations} = currentUser.toJSON();
        const myConvos = await this.conversation.find({ parties: {$in: [currentUser ]}})
          .populate({
            'path': 'parties',
            'model': 'User'
          });

        return {
          conversations: myConvos || [],
          error: false,
          status: 200,
          message: 'conversations fetches successfully'
        };
      }

      return {
        conversations: [],
        error: false,
        status: 404,
        message: 'Could not find current user'
      };
    } catch {
      return {
        message: 'something went wrong',
        error: true,
        status: 500,
        conversations: []
      };
    }
   
  }
}

export const conversationController = new ConversationController(Conversation, User);
