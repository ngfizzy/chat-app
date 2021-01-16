import { boundClass } from 'autobind-decorator';
import { UsersResponse } from '../../types/models';
import { User } from '../models';


@boundClass
export class UserController {
  constructor(private user: typeof User) {}

  async findAllUsers(): Promise<UsersResponse> {
    try {
      const users = await this.user.find();

      return {
        users,
        message: 'found in successfully',
        error: false,
        status: 200
      }
    } catch {
      return {
        users: [],
        message: 'Not found',
        error: false,
        status: 404
      }
    }
  }
}

export const userController = new UserController(User);
