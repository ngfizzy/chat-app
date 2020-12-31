import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from 'react-router-dom';
import Home from './components/pages/Home';
import { AuthProvider} from './store/AuthContext';
import Chat from './components/pages/Chat';
import ProtectedRoute from './ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Auth from './components/pages/Auth';

function App() {
  return (
    <div className="App">
    <AuthProvider>
      <Router>
        <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/chat" component={Chat} />
            <Route exact path="/auth" component={Auth} />
        </Switch>
      </Router>
    </AuthProvider>

    </div>
  );
}

export default App;
