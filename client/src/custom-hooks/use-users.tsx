import {useState, useEffect } from 'react';
import { IUser } from '../../../types/models';
import { userController } from '../controllers';


export const useUsers = (isAuth: boolean)  => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if(isAuth) {
      userController.getAllUsers()
      .then(users => {
          setUsers(users);
      })
      .catch(() => setError('not found'));
    }

  }, [isAuth])

  
  return {error,  users, setUsers, setError}
}
