import {User} from '../api/user';


export class UserController {
  constructor(private api: User) {}

  getAllUsers() {
    return this.api.getAllUsers()
      .then(({data: { users }}) => users);
  }
}
