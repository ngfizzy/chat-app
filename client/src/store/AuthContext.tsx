import React, { createContext, FC, useState } from 'react';
import { IUser, IAuthContext } from '../../../types/models';


export const AuthContext = createContext<IAuthContext|null>(null);

let stringifiedUser = localStorage.getItem('session');

let  initialUser: IUser | null; 

try {

  initialUser = JSON.parse(stringifiedUser!);
} catch {
  initialUser = null;
}

export const AuthProvider:FC<{}> = ({children}) => {
  const [user, setUser] = useState<IUser>(initialUser!);

  return(
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}

