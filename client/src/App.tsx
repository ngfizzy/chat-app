import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from 'react-router-dom';
import Home from './pages/Home';
import { AuthProvider} from './store/AuthContext';
import {Chat} from './pages/Chat';
import ProtectedRoute from './ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './pages/Auth';
import { Col, Row } from 'react-bootstrap';
import { AppNavBar } from './components/AppNavBar';
import { ContactsVisibilityProvider,ConversationProvider } from './store';

import './App.css';
function App() {
  return (
    <Row as="div" className="App">
      <AuthProvider>
        <ContactsVisibilityProvider>
        <AppNavBar />

        <ConversationProvider>
          <Col xs={12} className="p-0">
            <Router>
              <Switch>
                  <ProtectedRoute exact path="/" component={Home} />
                  <ProtectedRoute exact path="/chat" component={Chat} />
                  <Route exact path="/auth" component={Auth} />
              </Switch>
            </Router>
          </Col>
        </ConversationProvider>
          </ContactsVisibilityProvider>
      </AuthProvider>
    </Row>
  );
}

export default App;
