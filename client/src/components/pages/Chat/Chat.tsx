import React, { useContext } from 'react';
import { Col, Container,Row } from 'react-bootstrap';
import { ConversationsList } from '../../containers/ConversationsList';
import { Conversation } from '../../containers/Conversation';
import { AuthContext } from '../../../store/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import './Chat.css';


export const Chat = () => {
    const {user}=  useContext(AuthContext)!;

    return <Container fluid>
      <Row as='main' className="Chat">
        <Col xs={12} xl={8} className="h-100 mx-auto rounded">
          <Row className="h-100">
            <Col as="section" xs={12} sm={4} lg={3} className="h-100 p-1 bg-light rounded ConversationListWrapper">
                <header className="p-3 pb-0 ChatBorder Header">
                  <h3 className="font-weight-bold">Chats</h3>
                </header>
                <ConversationsList user={user!}/>
            </Col>
          
            <Col as="section" xs={12} sm={8}  lg={9} className="rounded">
              <Row className="bg-light ConversationWrapper">
                <Col xs={12}>
                  <header className="p-3 pb-0 ChatBorder Header">
                    <h3 className="font-weight-bold">Bryant Wayama</h3>
                  </header>
                  <Conversation />
                </Col>
              </Row>
              <Row className="bg-light rounded  TextAreaWrapper">
                <Col xs={12} as="section" className="rounded">
                  <Row className="h-100 pl-4 rounded" as="form">
                    <Col
                      placeholder="Type a message here"
                      className="mx-auto my-auto pt-3 px-3 h-75 rounded"
                      as="textarea"
                      sm={10}
                      md={11}
                      xs={11}></Col>
                    <Col
                      className="h-25 my-auto border-0 bg-transparent"
                      xs={1}
                      sm={2}
                      md={1}
                      as="button">
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
}
