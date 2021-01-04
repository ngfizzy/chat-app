import { useState, useEffect } from 'react';
import { IConversation } from '../../../types/models';
import {conversationController} from '../controllers';

export const useSetConversation = () => {
  const [participantId, setParticipantId] = useState('');
  const [conversation, setConversation] = useState<IConversation | null>();

  useEffect(() => {
    if(participantId) {
      conversationController.initConversation(participantId)
        .then(convo => {
          setConversation(convo);
        });
    }
  }, [participantId]);

  return { conversation, setParticipantId };
}
