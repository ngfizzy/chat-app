import React, { FC } from 'react';

import { ConversationSummary } from '../ConversationSummary';
import { ProfileIcon } from '../ProfileIcon';
import { IConversation, IUser } from '../../../../types/models';
import { getConversationName } from '../../utils';

import './RecentConversations.css'


interface Props {
  user?: IUser;
  conversations: IConversation[];
  select: (arg: IConversation) => () => any;
  selectedConversation?: IConversation
}
export const RecentConversations: FC<Props> = ({user, conversations, select, selectedConversation}) => {
  if(!conversations?.length) {
    return <h5 className="text-muted text-center mt-5">
      Use the search box to look for people
    </h5>
  }

  return (
    <div className="RecentConversations">
      {conversations
        .map(convo => (
          convo.parties.length > 1 ?
            <div 
              key={convo._id!}
              className={
                `p-1 mb-1 mt-3 RecentConversation 
                ${convo._id === selectedConversation?._id? 'selected' : ''}`
              }
              onClick={select(convo)}
            >
              <ProfileIcon
                name={getConversationName(convo.parties, user?._id!)}
              />
              <ConversationSummary
                name={getConversationName(convo.parties, user?._id!)}
                message={convo.lastMessage?.text || ''}
              />
            </div>: null
          )
        )
      }
    </div>
  );
}

