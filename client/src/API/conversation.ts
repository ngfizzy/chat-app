import { HttpClient, ConversationResponse } from '../../../types/models';


export class Conversation {
  private conversationBasePath = 'conversations';

  constructor(private http: HttpClient) {}

  async  initConversation(conversationId: string) {
    return this.http.get<ConversationResponse>(`${this.conversationBasePath}/${conversationId}`);
  }
}


