import React, { createContext, FC } from 'react';
import { IConversation, IMessage } from '../../../types/models';
import { useSetConversation, useConversationMessages } from '../custom-hooks';


export const ConversationContext = createContext<{
  setParticipantId?: (arg: string) => void;
  conversation?: IConversation;
  createMessage?: (arg: string) => void;
  conversationMessages?: IMessage[];
}>({});


export const ConversationProvider:FC<{}> = ({children}) => {
  const {conversation, setParticipantId} = useSetConversation();
  const {
    createMessage,
    conversationMessages,
  } = useConversationMessages(conversation?._id);

  return(
    <ConversationContext.Provider value={{
      conversation: conversation as IConversation, 
      setParticipantId,
      createMessage,
      conversationMessages
    }}>
      {children}
    </ConversationContext.Provider>
  );
}

