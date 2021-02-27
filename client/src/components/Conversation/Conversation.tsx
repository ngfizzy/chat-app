import React, {FC,useContext} from 'react';
import TimeAgo from 'react-timeago';
import { ProfileIcon } from '../ProfileIcon';
import { MultilineText } from '../MultilineText';
import { ConversationContext, AuthContext }  from '../../store';
import './Conversation.css';

const getMessageClass = (authorId?: string, userId?: string) => {
  let cssClass = 'my-2 ';

  if(authorId !== userId) {
    cssClass += 'ReceivedMessage';
  } else {
    cssClass += 'SentMessage'
  }
 
 return cssClass;
}

export const Conversation:FC = () => {
  const {user}=  useContext(AuthContext)!;
  const { conversationMessages: messages }  = useContext(ConversationContext);

  return <div className="Conversation">
    {
      messages?.map(message =>
        <div
          key={message._id}
          className={getMessageClass(message.author._id, user?._id)}
        >
          <div className="MessageWrapper">
            <ProfileIcon name={message.author.name} />
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
