import { auth } from '../api';
import { AuthController } from './auth-controller';

export const authController = new AuthController(auth);
