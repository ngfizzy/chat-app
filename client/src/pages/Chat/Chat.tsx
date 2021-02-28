import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { RecentConversations } from '../../components/RecentConversations';
import { Contacts } from '../../components/Contacts';

import { Conversation } from '../../components/Conversation';
import './Chat.css';

export const Chat = () => {
  return <Container fluid>
    <Row as='main' className="Chat">
      <Col xs={12} xl={10} className="h-100 mx-auto rounded">
        <Row className="h-100">
          <RecentConversations />
          <Conversation />
          <Contacts />
        </Row>
      </Col>
    </Row>
  </Container>;
}
