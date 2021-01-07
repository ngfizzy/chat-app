import { 
  HttpClient,
  ConversationResponse , 
  ConversationsResponse,
  MessagesResponse,
  MessageResponse,
  IMessage
} from '../../../types/models';

export class Conversation {
  private conversationBasePath = 'conversations';

  constructor(private http: HttpClient) {}

  initConversation(conversationId: string) {
    return this.http.get<ConversationResponse>(`${this.conversationBasePath}/${conversationId}`);
  }

  getMyConversations() {
    return this.http.get<ConversationsResponse>(`${this.conversationBasePath}`);
  }

  getConversationMessages(conversationId: string) {
    return this.http.get<MessagesResponse>(
        `${this.conversationBasePath}/${conversationId}/messages`
      );
  }

  createMessage(conversationId: string, message: Partial<IMessage>) {
    return this.http.post<MessageResponse>(
      `${this.conversationBasePath}/${conversationId}/messages`,
        message
    );
  }
}


