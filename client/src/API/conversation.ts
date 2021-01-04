import { 
  HttpClient,
  ConversationResponse , 
  ConversationsResponse
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
}


