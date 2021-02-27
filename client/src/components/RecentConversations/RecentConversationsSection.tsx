import React, { useContext } from "react";
import { ConversationContext } from "../../store"
import { RecentConversationsContainer } from "./RecentConversationsContainer"
import { VerticalSection } from "../VerticalSection"

export const RecentConversationsSection = () => {
  const {
    showConversationsList,
  } =  useContext(ConversationContext);

  return(
    <VerticalSection
      as="section"
      xs={12}
      sm={4}
      lg={3}
      heading="Recent Chats"
      isShowing={showConversationsList}
    >
      <RecentConversationsContainer />
    </VerticalSection>
  );
}