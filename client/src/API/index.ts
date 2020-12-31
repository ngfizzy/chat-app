import axios from '../axios';
import { Auth } from './auth';

export const auth = new Auth(axios);
  