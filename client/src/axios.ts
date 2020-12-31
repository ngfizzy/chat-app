import axios from 'axios';
import { IUser } from '../../types/models';


const baseURL = process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:5000/api/';
const instance = axios.create({ baseURL });

instance.interceptors.request.use((config) => {
    const authStr = localStorage.getItem('auth');

    if(authStr) {
      const auth = JSON.parse(authStr) as IUser;

      config.headers.authorization = `Bearer ${auth.token}`;
    }

    return config;
});

export default instance;
