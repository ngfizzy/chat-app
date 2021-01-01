import React from 'react';
import { Col, Container,Row } from 'react-bootstrap';
import { ConversationsList } from '../../containers/ConversationsList';

// import { AuthContext } from '../../../store/AuthContext';

import './Chat.css';


export const Chat = () => {
    // const {user}=  useContext(AuthContext)!;
    return <Container fluid>
      <Row as='main' className="Chat">
        <Col xs={12} xl={8} className="h-100 mx-auto rounded">
          <Row className="h-100">
            <Col as="section" xs={12} sm={4} lg={3} className="h-100 p-1 bg-light rounded ConversationListWrapper">
                <header className="p-3 pb-0 ChatBorder Header">
                  <h3 className="font-weight-bold">Chats</h3>
                </header>
                <ConversationsList/>
            </Col>
            <Col as="section" xs={12} sm={8}  lg={9} className="h-100 bg-light rounded Conversation">
                Chat
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
}
