import React, { createContext, FC } from 'react';
import { IConversation } from '../../../types/models';
import { useSetConversation } from '../custom-hooks';


export const ConversationContext = createContext<{
  setParticipantId?: (arg: string) => void;
  conversation?: IConversation;
}>({});


export const ConversationProvider:FC<{}> = ({children}) => {
  const {conversation, setParticipantId} = useSetConversation();

  return(
    <ConversationContext.Provider value={{
      conversation: conversation as IConversation, setParticipantId}}>
      {children}
    </ConversationContext.Provider>
  );
}

