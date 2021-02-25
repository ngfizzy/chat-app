import { useState, useEffect, useCallback } from "react";
import { conversationController } from "../controllers";
import { IMessage } from "../../../types/models";

export const useConversationMessages = (conversationId: string = "") => {
  const [conversationMessages, setConversationMessages] = useState<IMessage[]>(
    []
  );
  const createMessage = (text: string) => {
    const message: Partial<IMessage> = { text };

    if (conversationId) {
      conversationController
        .createConversationMessage(conversationId, message)
        .then((chatMessage) => {
          if (chatMessage) {
            setConversationMessages((messages) => [...messages, chatMessage]);
          }
        });
    }
  };

  const fetchAllMessages = useCallback(() => {
    if (conversationId) {
      conversationController
        .getConversationMessages(conversationId)
        .then((messages) => {
          setConversationMessages(() => messages);
        });
    }
  }, [conversationId]);

  useEffect(() => {
    const intervalId = setInterval(fetchAllMessages, 3000);
    fetchAllMessages();

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchAllMessages]);

  return { conversationMessages, createMessage };
};
