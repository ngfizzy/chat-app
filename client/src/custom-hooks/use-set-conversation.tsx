import { useState, useEffect, useCallback } from 'react';
import { IConversation } from '../../../types/models';
import {conversationController} from '../controllers';

export const useSetConversation = () => {
  const [participantId, setParticipantId] = useState('');
  const [conversation, setConversation] = useState<IConversation | null>();

  useEffect(() => {
    console.log('>>>>>>>>>>>>>>>>>>....', participantId)
    if(participantId) {
      conversationController.initConversation(participantId)
        .then(convo => {
          console.log('conversation>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.', convo)
          setConversation(convo);
        });
    }
  }, [participantId]);



  return {
    conversation,
    setParticipantId: useCallback((id: string) => {
      setParticipantId(id); 
    }, [setParticipantId]),
  };
}
