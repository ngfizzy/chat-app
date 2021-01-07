import axios from 'axios';
import { IUser } from '../../types/models';


const baseURL = process.env.NODE_ENV === 'production' ? '/api/' : ' http://localhost:5000/api/'
const instance = axios.create({ baseURL });

instance.interceptors.request.use((config) => {
    const authStr = localStorage.getItem('session');

    if(authStr) {

      try {
        const auth = JSON.parse(authStr) as IUser;
        config.headers.authorization = `Bearer ${auth.token}`;

      } catch {
        // just continue
      }
    }

    return config;
});

export default instance;
