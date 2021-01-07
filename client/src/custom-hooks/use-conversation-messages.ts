import { useState, useEffect } from 'react';
// import { IConversation } from '../../../types/models';
import {conversationController} from '../controllers';
import { IMessage } from '../../../types/models'

export const useConversationMessages = (conversationId: string = '') => {
  const [conversationMessages, setConversationMessages] = useState<IMessage[]>();
  const createMessage = (text: string) => {
      const message: Partial<IMessage> = {text};


      conversationController.createConversationMessage(
          conversationId,
          message
      )
      .then((chatMessage) => {
        console.log('>>>>>>>>>>>>>>>>Chat Message>>', chatMessage);
      })
      .catch(e => {
        console.log('Error>> Creating >>>>>>>>>>>>>>>>>.error', e);
      });
  } 

  useEffect(() => {
    if(conversationId) {
      conversationController.getConversationMessages(conversationId)
        .then(messages => {
          setConversationMessages(() => messages);
        })
        .catch((e) => console.log('>>>>>>>>>>>>error>>>>>>>>', e));
    }
  }, [conversationId]);

  return { conversationMessages, createMessage,  };
}
