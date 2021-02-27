import React, { useContext } from "react";
import { ContactsVisibilityContext } from "../../store";
import { ContactsContainer } from "./ContactsContainer";
import { VerticalSection } from "../VerticalSection";

export const ContactsSection = () => {
  const {
    isVisible: isShowingUsers,
    setIsVisible: setIsShowingUsers
  } = useContext(ContactsVisibilityContext);

  return <VerticalSection
    className="ContactListWrapper"
    as="section"
    xs={12}
    lg={3}
    heading="Contacts"
    canToggle
    isShowing={isShowingUsers}
    onToggle={() => setIsShowingUsers(window.innerWidth >= 992)}
    >
      <ContactsContainer />
  </VerticalSection>
}