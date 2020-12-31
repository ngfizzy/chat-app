import { useCallback, useContext, useState } from 'react';
import { IUser } from '../../../types/models';
import { authController } from '../controllers';
import { AuthContext } from '../store/AuthContext';


export const useAuth = (credentials: Partial<IUser>, isLoggingIn: boolean) => {
  const {user, setUser} = useContext(AuthContext)!;
  const [error, setError] = useState('');

  const authenticate = useCallback(async (e) => {
    e.preventDefault();

    try {
      let authUser: IUser | null;

      if(isLoggingIn) {
        authUser = await authController.login(credentials)
      } else {
        authUser = await authController.signup(credentials)
      }

      setUser(authUser!);
      setError('');
    } catch(err) {
      const {response} = err;
      const message = response ? response.data.message : 'Something went wrong'

      setError(message);
    }
   
  }, [credentials, setUser, isLoggingIn]);

  return {user, error, authenticate};
}
