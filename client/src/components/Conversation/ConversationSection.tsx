import React, { useContext, useState } from "react"
import { AuthContext, ConversationContext } from "../../store";
import { getConversationName } from "../../utils";
import { Conversation } from "./Conversation";
import { HorizontalSection } from "../HorizontalSection/HorizontalSection"
import { MessageForm } from "../MessageForm";
import { VerticalSection } from "../VerticalSection"
import { ChatlyLogo } from "../ChatlyLogo";

export const ConversationSection = () => {
  const {
    conversation,
    createMessage,
    setShowConversationsList
  } =  useContext(ConversationContext);
  const {user}=  useContext(AuthContext)!;

  const [messageText, setMessageText ] = useState('');

  const conversationHeading = getConversationName(conversation?.parties, user?._id);
  const toggleConversationList = () => {
    setShowConversationsList && setShowConversationsList((show: boolean) => !show)
  };

  const handleMessageTyped = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageText(e.target.value);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    createMessage && createMessage(messageText)
    setMessageText(() => '');
  };

  const onEnterPress = (e: React.KeyboardEvent) => {
    if(e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  return conversation ?
    (
      <VerticalSection as="section" xs={12} sm={8} lg={6}>
        <HorizontalSection
          height="77.8vh"
          heading={conversationHeading} 
          onToggle={toggleConversationList}>
          <Conversation />
        </HorizontalSection>
        <HorizontalSection height="15.2vh">
          <MessageForm
            onSubmit={sendMessage}
            onChange={handleMessageTyped}
            onKeyDown={onEnterPress}
            message={messageText}
          />
        </HorizontalSection>
      </VerticalSection>
    )
    : 
    <VerticalSection as="section" xs={12} sm={8} lg={6}>
      <div className="UnslelectedConversation">
        <ChatlyLogo />

      </div>
    </VerticalSection>
  
}