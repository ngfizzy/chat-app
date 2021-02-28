declare interface GenericObject {
  [key: string]: any;
}

export interface BaseRes {
  error: boolean;
  message: string;
  status: number;
}

export interface IUser {
  _id?: string;
  id?: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  token?: string;
  conversations?: IConversation[];
}

export interface IConversation {
  _id?: string;
  parties: IUser[];
  messages: IMessage[];
  lastMessage?: IMessage;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMessage {
  _id?: string;
  author: IUser;
  text: string;
  conversation?: IConversation | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse extends BaseRes {
  user: IUser | null;
}

export interface UsersResponse extends BaseRes {
  users: IUser[];
}

export interface ConversationResponse extends BaseRes {
  conversation: IConversation | null;
}

export interface ConversationsResponse extends BaseRes {
  conversations: IConversation[];
}

export interface MessageResponse extends BaseRes {
  chatMessage: IMessage | null;
}

export interface MessagesResponse extends BaseRes {
  chatMessages: IMessage[];
}
export interface IAuthContext {
  user?: IUser;
  setUser: (value?: IUser) => any;
}

export abstract class HttpClient {
  post<T>(...args: any): Promise<{ data: T }> {}
  get<T>(...args: any): Promise<{ data: T }> {}
  put<T>(...args: any): Promise<{ data: T }> {}
  patch<T>(...args: any): Promise<{ data: T }> {}
  delete<T>(...args: any): Promise<{ data: T }> {}
}
