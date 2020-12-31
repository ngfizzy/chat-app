import React from 'react';
import { IUser } from '../../../types/models';


type Action =  React.Dispatch<React.SetStateAction<Partial<IUser>>>;

export const updateFormState = (
  actionDispatcher: Action,
  ) => {

  return (e: React.ChangeEvent<HTMLInputElement>) =>  {
    e.persist();
  
    actionDispatcher((curr) => {
      const newFormData = {
          ...curr,
          [e.target.name]: e.target.value,
      };

      return newFormData;
    });
  }
}

