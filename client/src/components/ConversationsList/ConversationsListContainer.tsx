import React, { useCallback, useEffect } from "react";
import { FC, useContext, useState } from "react";
import { IConversation } from "../../../../types/models";
import { conversationController } from "../../controllers";
import { AuthContext, ConversationContext } from "../../store";
import { ConversationsList } from "./ConversationsList";

export const ConversationsListContainer: FC = () => {
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
  const selectCallback =  useCallback(select, [setParticipantId]);

  useEffect(() => {
    conversationController.getMyConversations()
      .then((convos) => {
        setConversations(convos);

      });
  }, [setConversations]);


  return <ConversationsList
    user={user}
    conversations={conversations}
    select={selectCallback}
    selectedConversation={conversation}
  />
}