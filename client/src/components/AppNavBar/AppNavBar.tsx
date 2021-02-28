import React, { FC, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import {
  Button,
  Col,
  Navbar,
  Nav,
} from 'react-bootstrap';

import { AuthContext } from '../../store/AuthContext';
import { ContactsVisibilityContext } from '../../store';

import './AppNavBar.css';
import { ChatlyLogo } from '../ChatlyLogo';

export const AppNavBar:FC = () => {
  const {user, setUser } = useContext(AuthContext)!;
  const {
    viewPortWidth,
    setIsVisible: setIsContactsVisible
  } =  useContext(ContactsVisibilityContext);

  const logout = () => {
    setUser();
    localStorage.removeItem('session');
  }

  return (
      user ? 
      <Navbar as={Col} xs={12} xl={10} variant="light" className="mx-auto mb-1 bg-light rounded" expand="sm">
        <Navbar.Brand  href="#home">
          <ChatlyLogo size="lg" />
        </Navbar.Brand>
        {viewPortWidth < 992?
          <Button onClick={() => setIsContactsVisible(isVisible => !isVisible)}>Contacts</Button> : null
        }

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Button
            className="d-inline-block ml-auto"
            variant="success"
            onClick={logout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
          </Button>
        </Navbar.Collapse>
      </Navbar> : null
      );
}