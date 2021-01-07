
import { IMessage } from '../../../types/models';
import { Conversation } from '../api/conversation';
 
export class ConversationController {
  constructor(private api: Conversation) {}

  initConversation(conversationId: string) {
    return this.api.initConversation(conversationId)
      .then(({data: { conversation }}) => conversation);
  }
  getMyConversations() {
    return this.api.getMyConversations()
      .then(({data: { conversations }}) => conversations);
  }
  getConversationMessages(conversationId: string) {
    return this.api.getConversationMessages(conversationId)
      . then(({data: { chatMessages }}) => chatMessages);
  }

  createConversationMessage(conversationId: string, message: Partial<IMessage>) {
    console.log('in controller.>>>>>>>>>>>>>.', conversationId, '>>>>>>>>>>.', message)
    return this.api.createMessage(conversationId, message)
      . then(({data: { chatMessage }}) => chatMessage);
  }
}
