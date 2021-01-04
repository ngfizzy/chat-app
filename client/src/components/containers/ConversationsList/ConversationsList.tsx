import React, { FC, useCallback, useState, useEffect } from 'react'
import { ConversationSummary } from '../../presentation/ConversationSummary'
import { ProfileIcon } from '../../presentation/ProfileIcon'
import { IConversation, IUser } from '../../../../../types/models'
import { conversationController } from '../../../controllers'
import './ConversationsList.css'

const getChatName = (parties: IUser[], currentUserId: string) => {
  const receiver =  parties.filter(party => party._id !== currentUserId) || [] ;
  
  if(receiver?.length) {
    return receiver?.pop()?.name || '';
  }

  const [sender, reciever] = parties;

  return sender.username === reciever.username ? sender.name : '';
};

export const ConversationsList: FC<{user: IUser }> = ({user}) => {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [selectedId, setSelectedId] = useState('');

  const select = (conversationId: string) => 
    () => setSelectedId(conversationId);
  const selectCallback =  useCallback(select, []);

  useEffect(() => {
  conversationController.getMyConversations()
    .then((convos) => {
      setConversations(convos);
    });
  }, []);

  return (
    <div className="ConversationsList">
      {conversations
        .map(conversation => (
          conversation.parties.length > 1 ?
            <div 
              key={conversation._id!}
              className={
                `p-1 mb-1 ConversationListItem 
                ${selectedId === conversation._id? 'selected' : ''}`
              }
              onClick={selectCallback(conversation._id!)}
            >
              <ProfileIcon name={getChatName(conversation.parties, user._id!)} />
              <ConversationSummary
                name={getChatName(conversation.parties, user._id!)} 
                message={conversation.lastMessage || ''} />
            </div>: null

          )
        )
      }
    </div>
  );
}
