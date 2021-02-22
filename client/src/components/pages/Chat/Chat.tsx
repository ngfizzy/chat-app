import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Col, Container,Row } from 'react-bootstrap';

import { ConversationsList } from '../../ConversationsList';
import { Conversation } from '../../containers/Conversation';
import { AuthContext, ContactsVisibilityContext, ConversationContext } from '../../../store/';
import {getConversationName} from '../../../utils'
import { Contacts } from '../../Contacts';

import './Chat.css';

export const Chat = () => {
    const {user}=  useContext(AuthContext)!;
    const {
      conversation,
      createMessage,
      showConversationsList,
      setShowConversationsList
    } =  useContext(ConversationContext);
    const {
      isVisible: isShowingUsers,
      setIsVisible: setIsShowingUsers
    } = useContext(ContactsVisibilityContext);
   
    const [messageText, setMessegeText ] = useState('');

    const toggleConversationList = () => {
      setShowConversationsList && setShowConversationsList((show: boolean) => !show)
    }
  
    const handleMessageTyped = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessegeText(e.target.value);
    };

    const sendMessage = (e: React.FormEvent) => {
      e.preventDefault();
      createMessage && createMessage(messageText)
      setMessegeText(() => '');
    };

    const onEnterPress = (e: React.KeyboardEvent) => {
      if(e.key === 'Enter' && e.shiftKey === false) {
        e.preventDefault();
        sendMessage(e);
      }
    };

    return <Container fluid>
      <Row as='main' className="Chat">
        <Col xs={12} xl={10} className="h-100 mx-auto rounded">
          <Row className="h-100">
          { showConversationsList? 
              <Col
                as="section"
                xs={12}
                sm={4} lg={3}
                className="h-100 p-1 bg-light rounded ConversationListWrapper"
              >
                  <header className="p-3 pb-0 ChatBorder Header">
                    <h3 className="font-weight-bold d-flex justify-content-between">
                        Chats
                          <span
                            onClick={toggleConversationList}
                            className="text-success d-sm-none">
                            <FontAwesomeIcon icon={faTimes} />
                          </span>
                      </h3>
                  </header>
                  <ConversationsList />
              </Col> : null
            }
          
            <Col as="section" xs={12} sm={8} lg={6} className="rounded">
              <Row className="bg-light ConversationWrapper">
                <Col xs={12}>
                  <header className="p-3 pb-0 ChatBorder Header">
                    <h3 className="font-weight-bold d-flex justify-content-between">{
                        getConversationName(conversation?.parties, user?._id)}
                          <span
                          onClick={toggleConversationList}
                          className="text-success d-sm-none">
                          <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </h3>
                  </header>
                  <Conversation />
                </Col>
              </Row>
              <Row className="bg-light rounded  TextAreaWrapper">
                <Col xs={12} as="section" className="rounded">
                  {/* The form */}
                  <Row className="h-100 pl-4 rounded" as="form" onSubmit={sendMessage}>
                    {/* TExtarea */}
                    <Col
                      placeholder="Type a message here"
                      className="mx-auto my-auto pt-3 px-3 h-75 rounded"
                      as="textarea"
                      sm={10}
                      md={11}
                      xs={11}
                      value={messageText}
                      onChange={handleMessageTyped}
                      onKeyDown={onEnterPress}
                    ></Col>
                      {/* Send button */}
                    <Col
                      className="h-25 my-auto border-0 bg-transparent"
                      xs={1}
                      sm={2}
                      md={1}
                      type="submit"
                      as="button">
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col
              as="section"
              xs={12}
              lg={3}
              className={`h-100 p-1 bg-light rounded ContactsListWrapper ${window.innerWidth <= 992 && isShowingUsers ? 'Mobile': ''}`}
            >
              <header className="p-3 pb-0 ChatBorder Header">
                <h3 className="font-weight-bold d-flex justify-content-between">
                  Contacts
                    <span
                      onClick={() => setIsShowingUsers(window.innerWidth >= 992)}
                      className="text-success d-sm-none">
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </h3>
              </header>
              <Contacts />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>;
}
