import React, { FC, useCallback, useState } from 'react'
import { ConversationSummary } from '../../presentation/ConversationSummary'
import { ProfileIcon } from '../../presentation/ProfileIcon'
import './ConversationsList.css'

const initialConversations = [
  {
    id: '123a4',
    name: 'Bryant Wayama',
    message: `We are getting close to the completion of the project.
        Should I to deploy?
      `,
  },
  {
    id: '1234e',
    name: 'Bimbo Olowoyo',
    message: `
        Hey bro. Long time no see.
      `,
  },
  {
    id: '12a34',
    name: 'Kingdom Isaac',
    message: `
        Boss man. Baba na you o.
      `,
  },
  {
    id: '1234s',
    name: 'The Broadcaster',
    message: `
      Wishing you a Happy New Year with the hope that you will have many blessings in the year to come.
    `,
  },
  {
    id: '1234asdfadfs',
    name: 'Meme Warrior',
    message: `
      Just Negodu
    `,
  },
  {
    id: '123m4',
    name: 'The Whiner',
    message: `
      Baba I wan be like you when I grow up o.
    `,
  },
  {
    id: '1234sj',
    name: 'The Begger',
    message: `
      How far dear. How are you doing. Abeg I need 2k Urgently. 🥺 My papa dey hospital
    `,
  },
  {
    id: '1234sj1a234',
    name: 'Jester',
    message: `
     🤣🤣🤣🤣🤣😂😂😂😂 🤣🤣😂😂😂😂  🤣🤣🤣🤣🤣😆😆😆😆😆😆😆🤣🤣😂😂😂😂  🤣🤣🤣🤣🤣

    `,
  },
  {
    id: '1234sj1aa234',
    name: 'Monitoring spirit',
    message: `
     My purpose in life is to view people's status and never comment.
    `,
  },
  {
    id: '1234asdfasfdsj1a234',
    name: 'The Pastor',
    message: `
      I prophesy today that every evil plan that the enemy had planned for you
      would fail woefully.
    `,
  },
];
export const ConversationsList: FC = () => {
  const [conversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState('');

  const select = (conversationId: string) => 
    () => setSelectedId(conversationId);

  
  const selectCallback =  useCallback(select, []);
  return (
    <div className="ConversationsList">
      {conversations
        .map(conversation => 
          <div 
            key={conversation.id}
            className={
              `p-1 mb-1 ConversationListItem 
              ${selectedId === conversation.id? 'selected' : ''}`
            }
            onClick={selectCallback(conversation.id)}
          >
            <ProfileIcon name={conversation.name} />
            <ConversationSummary
              name={conversation.name} 
              message={conversation.message} />
          </div>
        )
      }
    </div>
  );
}
