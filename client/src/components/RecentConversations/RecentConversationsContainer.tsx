import React, { useCallback, useEffect } from "react";
import { FC, useContext, useState } from "react";
import { IConversation } from "../../../../types/models";
import { conversationController } from "../../controllers";
import { AuthContext, ConversationContext } from "../../store";
import { RecentConversations } from "./RecentConversations";

export const RecentConversationsContainer: FC = () => {
  const {user}=  useContext(AuthContext)!;

  const [conversations, setConversations] = useState<IConversation[]>([]);
  const {
    conversation,
    setParticipantId,
    setShowConversationsList
  } = useContext(ConversationContext);

  const select = (convo: IConversation) => {
    const convoParty = convo.parties.find(
      party => party._id !== user?._id
    );
    let id: string;

    if(convoParty) {
      id = convoParty._id!;
    } else if(convo.parties.length){
        id = convo.parties[0]._id!;
    } else {
      id = '';
    }

    return () => {
      setParticipantId!(id);
      if(window.innerWidth <= 556) {
        setShowConversationsList!((show: boolean) => !show);
      }
    }
  }
  const selectCallback =  useCallback(select, [setParticipantId, conversation]);
  const getMyConversations = useCallback(() =>{
    conversationController.getMyConversations()
      .then((convos) => {
        setConversations(convos);
      });
  }, [setConversations])
  useEffect(() => {
    const intervalId = setInterval(getMyConversations, 5000);
    
    getMyConversations();

    return () => {
      clearInterval(intervalId);
    }
  }, [getMyConversations]);

  return (
    <RecentConversations
      user={user}
      conversations={conversations}
      select={selectCallback}
      selectedConversation={conversation}
    />
  )
}