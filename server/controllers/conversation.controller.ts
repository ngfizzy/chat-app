
import { boundClass } from 'autobind-decorator';

import { ConversationResponse } from '../../types/models';
import { Conversation, User } from '../models';


@boundClass
export class ConversationController {
  constructor(private conversation: typeof Conversation, private user: typeof User) {}

  async initConversation({
      recipientId,
      userId
  }: {recipientId: string; userId: string;}): Promise<ConversationResponse> {

  
    try {

      const recipient = await this.user.findById(recipientId);
      const me = await this.user.findById(userId);
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
}

export const conversationController = new ConversationController(Conversation, User);
