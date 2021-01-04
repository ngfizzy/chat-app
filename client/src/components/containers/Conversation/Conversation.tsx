import React, {FC, useState, useContext} from 'react';
import TimeAgo from 'react-timeago'
import { ProfileIcon } from '../../presentation/ProfileIcon';
import { MultilineText } from '../../presentation/MultilineText'
import { AuthContext } from '../../../store/AuthContext';
import './Conversation.css';


const initialConversations = {
    id: '1',
    parties: ['1', '5fee1a10e4ec59783428cf2f'],
    messages: [
    {
      user: {
        id: '1',
        name:  'Bryant Wayama',
      },
      id: '1',
      createdAt: new Date(1609353098000),
      text: `
        Hey there...
          I signed the contract!! Is there any other thing you ant me to do?
      `,
    },
    {
      id: '1234',
      user: { 
        id: '1',
        name:  'Bryant Wayama',
        username: 'bryant'
      },
      createdAt: new Date(1609356698000),
      text: 'Hey! Got my message?',
    },
    {
      id: '12a34',
      user: { 
        id: '5fee1a10e4ec59783428cf2f',
        name:  'Olufisayo Bamidele',
        username: 'fizzy'
      },
      createdAt: new Date(1609453898000),
      text: 'Hey Bryant Sorry for the late response. I was out of office yesterday',
    },
    {
      id: '12a3a4',
      user: { 
        id: '5fee1a10e4ec59783428cf2f',
        name:  'Olufisayo Bamidele',
        username: 'fizzy'
      },
      createdAt: new Date(1609453958000),
      text: 'We can kick off the project. Let me know if yo need anything.',
    },
    {
      id: '123aa4',
      user: { 
        id: '1',
        name:  'Bryant Wayama',
        username: 'bryant'
      },
      createdAt: new Date(1609454438000),
      text: 'I am unable to login to AWS',
    },
    {
      id: '123ana4',
      user: { 
        id: '5fee1a10e4ec59783428cf2f',
        name:  'Olufisayo Bamidele',
        username: 'bryant'
      },
      createdAt: new Date(1609459178000),
      text:  'Oh. True.  \n I would need to send you thatI\'ll need to send you that. I guess you have signal installed.',
    },
    {
      id: '123anga4',
      user: { 
        id: '1',
        name:  'Olufisayo Bamidele',
        username: 'bryant'
      },
      createdAt: new Date(1609459178000),
      text:  `
        Yes
      `,
    },
    {
      id: '123anaafa4',
      user: { 
        id: '5fee1a10e4ec59783428cf2f',
        name:  'Olufisayo Bamidele',
        username: 'bryant'
      },
      createdAt: new Date(1609459178000),
      text:  `
        Alright. Sending now...
      `
    },
    {
      id: 'aaaarzra',
      user: { 
        id: '1',
        name:  'Bryant Wayama',
        username: 'bryant'
      },
      createdAt: new Date(1609545578000),
      text:  `
        Happy new year!!! 
      `
    },
    {
      id: 'aaaarra',
      user: { 
        id: '1',
        name:  'Bryant Wayama',
        username: 'bryant'
      },
      createdAt: new Date(1609545578000),
      text:  `
        We are getting close to the completion of the project.
        Should I proceed to deploy
      `
    },
  ]
};

export const Conversation:FC = () => {
  const {user}=  useContext(AuthContext)!;
  const [messages] = useState(initialConversations.messages);

  return <div className="Conversation">
    {
      messages.map(message =>
        <div
          key={message.id}
          className={`my-2 ${message.user.id !== user?.id ? 'ReceivedMessage' : 'SentMessage'}`}
        >
          <div className="MessageWrapper">
            <ProfileIcon name={message.user.name} />
            <div className="font-weight-700 m-1 p-2 rounded Message">
              <MultilineText text={message.text}/>
            </div>
          </div>
          <span className="ml-5 Time">
            <TimeAgo date={message.createdAt}  />
          </span>
        </div>
      )
    }
  </div>
};
