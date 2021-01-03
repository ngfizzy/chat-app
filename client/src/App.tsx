import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from 'react-router-dom';
import Home from './components/pages/Home';
import { AuthProvider} from './store/AuthContext';
import {Chat} from './components/pages/Chat';
import ProtectedRoute from './ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Auth from './components/pages/Auth';
import { Button, Col, Form, FormControl, Nav, Navbar, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <Row as="div" className="App">
      <AuthProvider>
        <Navbar as={Col} xs={12} xl={8} variant="light" className="mx-auto mb-1 bg-light rounded" expand="sm">
            <Navbar.Brand  href="#home">
              <h3 className="font-weight-bold font-italic NavBrand">
                Chatly
              </h3>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
              </Nav>
              <Form inline className="mx-auto row mb-1">
                <FormControl type="text" placeholder="Search" className="col-sm-8 col-md-8 mx-auto" />
                <Button
                  variant="outline-primary"
                  className="col-sm-4 col-md-4 mx-auto"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </Form>

              <Button className="d-inline-block ml-auto" variant="success">
                <FontAwesomeIcon icon={faSignOutAlt} />
              </Button>
            </Navbar.Collapse>
          </Navbar>
          <Col xs={12} className="p-0">
            <Router>
              <Switch>
                  <ProtectedRoute exact path="/" component={Home} />
                  <ProtectedRoute exact path="/chat" component={Chat} />
                  <Route exact path="/auth" component={Auth} />
              </Switch>
            </Router>
          </Col>
      </AuthProvider>
    </Row>
  );
}

export default App;
