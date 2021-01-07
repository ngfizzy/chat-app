import React, { FC, useCallback, useState, useEffect, useContext } from 'react'
import { ConversationSummary } from '../../presentation/ConversationSummary'
import { ProfileIcon } from '../../presentation/ProfileIcon'
import { IConversation, IUser } from '../../../../../types/models'
import { conversationController } from '../../../controllers'
import { ConversationContext } from '../../../store';
import { getConversationName } from '../../../utils';
import './ConversationsList.css'

export const ConversationsList: FC<{user: IUser }> = ({user}) => {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const { conversation, setParticipantId } = useContext(ConversationContext);

  const select = (convo: IConversation) => {
    const convoParty = convo.parties.find(
      party => party._id !== user._id
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
    }
  }
  const selectCallback =  useCallback(select, [setParticipantId]);

  useEffect(() => {
    conversationController.getMyConversations()
      .then((convos) => {
        setConversations(convos);
      });
  }, [setConversations]);


  if(!conversations?.length) {
    return <h5 className="text-muted text-center mt-5">
      Use the search box to look for people
    </h5>
  }

  return (
    <div className="ConversationsList">
      {conversations
        .map(convo => (
          convo.parties.length > 1 ?
            <div 
              key={convo._id!}
              className={
                `p-1 mb-1 mt-3 ConversationListItem 
                ${convo._id === conversation?._id? 'selected' : ''}`
              }
              onClick={selectCallback(convo)}
            >
              <ProfileIcon
                name={getConversationName(convo.parties, user._id!)}
              />
              <ConversationSummary
                name={getConversationName(convo.parties, user._id!)}
                message={convo.lastMessage?.text || ''}
              />
            </div>: null
          )
        )
      }
    </div>
  );
}

