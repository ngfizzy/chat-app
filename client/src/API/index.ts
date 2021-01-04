import axios from '../axios';
import { Auth } from './auth';
import { User } from './user';
import { Conversation } from './conversation';
export const auth = new Auth(axios);
export const user = new User(axios);
export const conversation = new Conversation(axios);
