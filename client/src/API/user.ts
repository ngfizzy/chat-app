import { UsersResponse, HttpClient } from '../../../types/models';


export class User {
  private userBasePath = 'users';

  constructor(private http: HttpClient) {}

  async getAllUsers() {
    return this.http.get<UsersResponse>(`${this.userBasePath}/`);
  }
}


