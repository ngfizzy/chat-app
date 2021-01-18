import React, { FC, useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import {
  Button,
  Col,
  Form,
  FormControl,
  Navbar,
  Nav,
  ListGroup,
  Row
} from 'react-bootstrap';
import { useUsers } from '../../../custom-hooks';
import { IUser } from '../../../../../types/models';
import { AuthContext } from '../../../store/AuthContext';
import { ConversationContext } from '../../../store/ConversationContext';
import './AppNavBar.css';

export const AppNavBar:FC = () => {
  const {user: authUser, setUser } = useContext(AuthContext)!
  const {users} = useUsers(!!authUser);
  const [isShowingUsers, setIsShowingUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>();

  const [ searchTerm, setSearchTerm ] = useState('');
  const [searchResults, setSearchResults] = useState<IUser[]>([]);
  const { setParticipantId} = useContext(ConversationContext);


  useEffect(() => {
      setSearchResults(() => users);
  }, [users]);

  useEffect(() => {
    if(selectedUser) {
      setParticipantId!(selectedUser._id!)
    }
  }, [selectedUser, setParticipantId]);

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    const results = users.filter(user => user
        .name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setSearchResults(() => results);
  };


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  };

  const logout = () => {
    setUser();
    localStorage.removeItem('session');
  }

  return (
    <>
      {authUser ? <Navbar as={Col} xs={12} xl={8} variant="light" className="mx-auto mb-1 bg-light rounded" expand="sm">
        <Navbar.Brand  href="#home">
          <h3 className="font-weight-bold font-italic NavBrand">
            Chatly
          </h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Form 
            inline
            className="mx-auto row mb-1"
            onSubmit={search}
          >
            <FormControl 
              type="text" 
              placeholder="Search" 
              className="col-sm-8 col-md-8 mx-auto"
              value={searchTerm}
              onChange={handleOnChange}
              onFocus={() => setIsShowingUsers(true)}
            />
            <Button
              variant="outline-primary"
              className="col-sm-4 col-md-4 mx-auto"
              type="submit"
            >
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </Form>

          <Button
            className="d-inline-block ml-auto"
            variant="success"
            onClick={logout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
          </Button>
        </Navbar.Collapse>
      </Navbar> : null
      }
      { isShowingUsers? <Col xs={10} md={8} className="mx-auto bg-light mb-1 SearchResults">
          <Row>
            <Col as="h3" xs={11} className="text-center text-primary">Contacts</Col>
            <Button
              variant="outline-success" 
              className="col-xs-1 mt-1"
              onClick={() => setIsShowingUsers(false)}
            >
              <FontAwesomeIcon icon={faTimes}/>
            </Button>
          </Row>
          <Row>
            <ListGroup as={Col} xs={12} md={8} lg={6} className="mx-auto">
              {searchResults.map((result, index) =>
                <ListGroup.Item
                  variant={index % 2 > 0 ? 'dark': 'light'}
                  onClick={() => {
                    setSelectedUser(result)
                    setIsShowingUsers(false);
                  }}
                  className="text-capitalize Clickable" key={result._id}>
                  {result.name}
                </ListGroup.Item> 
              )}
            </ListGroup>
          </Row>
      </Col>: null}
    </>
  );
}