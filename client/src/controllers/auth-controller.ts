import { IUser } from '../../../types/models';
import {Auth} from '../API/auth';

export class AuthController {

  constructor(private api: Auth) {}

  login(loginData: Partial<IUser>) {
    return this.api.login(loginData)
      .then(({data: { user }}) => user);
  }

  signup(signupData: Partial<IUser>) {
    return this.api.signup(signupData as IUser)
    .then(({data: { user }}) => user)
  }
}

