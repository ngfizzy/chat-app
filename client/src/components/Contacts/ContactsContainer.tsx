
import React,  { FC, useContext, useEffect, useState } from "react";

import { IUser } from "../../../../types/models";
import { useUsers } from "../../custom-hooks";
import { AuthContext, ContactsVisibilityContext, ConversationContext } from "../../store";
import { Contacts } from "./Contacts";

export const ContactsContainer:FC = () => {
  const {user: authUser } = useContext(AuthContext)!
  const { setParticipantId } = useContext(ConversationContext);
  const {
    isVisible: isShowingUsers,
    setIsVisible: setIsShowingUsers
  } = useContext(ContactsVisibilityContext);

  const [selectedUser, setSelectedUser] = useState<IUser | undefined>();
  const [ searchTerm, setSearchTerm ] = useState('');
  const [searchResults, setSearchResults] = useState<IUser[]>([]);

  const {users} = useUsers(!!authUser);

  useEffect(() => {
    if(selectedUser) {
      console.log(selectedUser._id);
      setParticipantId!(selectedUser._id!)
    }
  }, [selectedUser, setParticipantId]);

  useEffect(() => {
      setSearchResults(() => users);
  }, [users]);

  // useEffect(() => {
  //   console.log('selectedUser?>>>>', selectedUser)
  // }, [selectedUser])

  const search = (e: React.FormEvent) => {
    e.preventDefault();
  
    const results = users.filter(user => user
        .name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    setSearchResults(() => results);
  };

  return isShowingUsers ? <Contacts 
    setSearchTerm={setSearchTerm}
    setIsShowingUsers={setIsShowingUsers}
    setSelectedUser={setSelectedUser}
    searchTerm={searchTerm}
    search={search}
    searchResults={searchResults}
    /> : null;
}