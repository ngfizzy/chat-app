import { IUser } from '../../../types/models';

export const getConversationName = (parties?: IUser[], currentUserId?: string) => {
  const receiver =  parties?.filter(party => party._id !== currentUserId) || [];
  
  if(receiver?.length) {
    return receiver?.pop()?.name || '';
  }

  const [sender, reciever] = parties || [];

  return sender?.username === reciever?.username ? sender?.name : '';
};
