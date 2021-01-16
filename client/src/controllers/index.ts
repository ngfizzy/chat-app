import { auth,user, conversation } from '../api';
import { AuthController } from './auth-controller';
import { UserController } from './user-controller';
import { ConversationController } from './conversation-controller';


export const authController = new AuthController(auth);
export const userController = new UserController(user);
export const conversationController = new ConversationController(conversation)