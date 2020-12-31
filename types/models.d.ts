
declare interface GenericObject {
    [key: string]: any;
}

export interface BaseRes {
  error: boolean;
  message: string;
  status: number;
}

export interface IUser {
  id?: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  token?: string;
}

export interface AuthResponse extends BaseRes {
  user: IUser | null;
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