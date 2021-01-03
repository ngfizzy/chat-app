
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
}


export interface IConversation {
  _id?: string;
  parties: IUser[];
  messages: IMessage[]
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  _id?: string;
  author: IUser;
  text: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse extends BaseRes {
  user: IUser | null;
}

export interface UsersResponse extends BaseRes {
  users: IUser[]
}



export interface IAuthContext  {
  user?: IUser
  setUser: (value: IUser) => any;
}


export abstract class HttpClient {
  post<T>(...args: any): Promise<{data: T}> {}
  get<T>(...args: any): Promise<{data: T}> {}
  put<T>(...args: any): Promise<{data: T}> {}
  patch<T>(...args: any): Promise<{data: T}> {}
  delete<T>(...args: any): Promise<{data: T}> {}
}