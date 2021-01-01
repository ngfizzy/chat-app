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
import { Col, Nav, Navbar, Row } from 'react-bootstrap';

function App() {
  return (
    <Row as="div" className="App">
      <AuthProvider>
        <Navbar as={Col} xs={12} xl={8} variant="light" className="mx-auto mb-1 bg-light rounded" expand="sm">
            <Navbar.Brand  href="#home"><h3 className="font-weight-bold font-italic NavBrand">Chatly</h3></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
              </Nav>
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
