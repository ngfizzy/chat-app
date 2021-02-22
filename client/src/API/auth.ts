import { AuthResponse, HttpClient, IUser } from "../../../types/models";

export class Auth {
  private authBasePath = "auth";

  constructor(private http: HttpClient) {}

  async signup(user: IUser) {
    return this.http.post<AuthResponse>(`${this.authBasePath}/signup`, user);
  }

  async login(data: Partial<IUser>) {
    return this.http.post<AuthResponse>(`${this.authBasePath}/login`, data);
  }
}
