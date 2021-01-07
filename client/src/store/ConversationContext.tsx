import React, { createContext, useState, FC } from 'react';
import { IConversation, IMessage } from '../../../types/models';
import { useSetConversation, useConversationMessages } from '../custom-hooks';


export const ConversationContext = createContext<{
  setParticipantId?: (arg: string) => void;
  conversation?: IConversation;
  createMessage?: (arg: string) => void;
  conversationMessages?: IMessage[];
  setShowConversationsList?: (arg: any) => any;
  showConversationsList?: boolean;
}>({});


export const ConversationProvider:FC<{}> = ({children}) => {
  const {conversation, setParticipantId} = useSetConversation();
  const {
    createMessage,
    conversationMessages,
  } = useConversationMessages(conversation?._id);

  const [
    showConversationsList,
    setShowConversationsList
  ] = useState(true);

  return(
    <ConversationContext.Provider value={{
      conversation: conversation as IConversation, 
      setParticipantId,
      createMessage,
      conversationMessages,
      setShowConversationsList,
      showConversationsList
    }}>
      {children}
    </ConversationContext.Provider>
  );
}

