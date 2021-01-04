
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
}
