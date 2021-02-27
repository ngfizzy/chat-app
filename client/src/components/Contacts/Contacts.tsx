import React, { Dispatch, FC, FormEvent, SetStateAction } from "react";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, FormControl, ListGroup, Row } from "react-bootstrap";

import { IUser } from "../../../../types/models";

import './Contacts.css';

interface Props {
  search:  (e: FormEvent) => void;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  searchTerm: string;
  searchResults: IUser[];
  setIsShowingUsers: Dispatch<SetStateAction<boolean>>;
  setSelectedUser: Dispatch<SetStateAction<IUser | undefined>>;
}

export const Contacts:FC<Props> = ({
  search,
  searchTerm,
  setSearchTerm,
  setIsShowingUsers,
  searchResults,
  setSelectedUser,
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  };

  const select = (user: IUser) => {
    return () => {
      setSelectedUser(user);
      setIsShowingUsers(window.innerWidth >= 992);
    }
  };

  const contactsList = searchResults.map((result, index) =>(
    <ListGroup.Item
      variant={index % 2 > 0 ? 'dark': 'light'}
      onClick={select(result)}
      className="text-capitalize Clickable" key={result._id}>
      {result.name}
    </ListGroup.Item>))

  return  <Col className="mx-auto bg-light mb-1 Contacts">
    <Row>
      <Col xs={12} >
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
          variant="outline-success" 
          className="col-xs-1 mt-1 d-lg-none"
          onClick={() => setIsShowingUsers(false)}
        >
          <FontAwesomeIcon icon={faTimes}/>
        </Button>
    </Col>
    </Row>
    <Row>
      <Col as="h3" xs={11} className="text-center text-primary">Contacts</Col>
    </Row>
    <Row>
      <ListGroup as={Col} className="mx-auto">
        {contactsList}
      </ListGroup>
    </Row>
  </Col>;
}