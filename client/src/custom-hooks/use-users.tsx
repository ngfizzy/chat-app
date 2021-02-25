import {useState, useEffect, useCallback } from 'react';
import { setInterval } from 'timers';
import { IUser } from '../../../types/models';
import { userController } from '../controllers';

export const useUsers = (isAuth: boolean)  => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState('');


  const getAllUsers = useCallback(() => {
    if(isAuth) {
      userController.getAllUsers()
      .then(users => {
        setUsers(users);
      })
      .catch(() => setError('not found'));
    }
  }, [isAuth]);


  useEffect(() => {
    const intervalId = setInterval(() =>{
      getAllUsers();
    }, 10000);
    getAllUsers();

    return () => {
      clearInterval(intervalId);
    }
  }, [getAllUsers]);

  
  return {error,  users, setUsers, setError}
}
