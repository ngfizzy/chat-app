import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { boundClass } from 'autobind-decorator';

import { AuthResponse, IUser } from '../../types/models';
import { User } from '../models';


@boundClass
export class AuthController {
  constructor(private user: typeof User) {}

  async login(credentials: IUser): Promise<AuthResponse> {
    const authError =  {
      message: 'Wrong username or password',
      error: true,
      user: null,
      status: 401
    };

    try {
      let found = await this.user.findOne({
          email: credentials.username,
      }, '+password');

      if(!found) {
        found = await this.user.findOne({
          username: credentials.username,
        }, '+password');
      }

      if(!found) {
       return authError;
      }

      const {password: hashed,  ...rest} =  found.toJSON();
      const valid = await bcrypt.compare(credentials.password!, hashed!)

      if(!valid) {
        return authError;
      }

      const token = JWT.sign(rest, process.env.JWT_SECRET!);
      const user: IUser = {...rest, id: found.id, token };

      return {
        user,
        message: 'logged in successfully',
        error: false,
        status: 200
      }
    } catch {
      return authError;
    }
  }

  async signup(credentials: IUser): Promise<AuthResponse> {
    try{
      const conflictError = await this.checkConflict(credentials);

      if(conflictError) {
        return conflictError;
      }

      const {password: unhashedPassword } = credentials;

      credentials.password = await bcrypt.hash(
        credentials.password,
        parseInt(process.env.SALT_ROUND!)
      );

      await this.user.create(credentials);

      credentials.password = unhashedPassword;
      return this.login(credentials);
    } catch(e) {
      return {
        error: true,
        user: null,
        message: 'Something went wrong',
        status: 500
      };
    }
  }


  private async checkConflict({username, email}: IUser): Promise<AuthResponse| null> {
    const error: AuthResponse = {
      message: '',
      user: null,
      error: true,
      status: 409,
    }

    try {
      let existing = await this.user.findOne({ email }, '+password');

      if (existing) {
        error.message = 'Email already exist';

        return error;
      }

      existing = await this.user.findOne({ username }, '+password');


      if(existing) {
        error.message = 'Username already exist';

        return error;
      }

      return null;
    } catch(e) {
      error.message  = 'Something went wrong';
      error.status = 500;

      return error;
    }
  }
}

export const authController = new AuthController(User);
