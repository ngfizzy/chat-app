import React, { FC, useCallback, useEffect, useState } from 'react';
import Signup from '../../components/Signup/Signup';
import Login from '../../components/Login/Login'
import { Button, Col, Row } from 'react-bootstrap';
import { updateFormState } from '../../helpers';
import { IUser } from '../../../../types/models';
import { useAuth } from '../../custom-hooks';
import './Auth.css';
import { Redirect } from 'react-router-dom';


const defaultCredentials: Partial<IUser> = {
  name: '',
  email: '',
  username: '',
  password: '',
};

const Auth: FC<{}> = () => {
    const [isLoggingIn, setLoggingIn] = useState(false);
    const [credentials, setCredentials] = useState(defaultCredentials)
    const {user, error, authenticate} = useAuth(credentials, isLoggingIn);
    
    useEffect(() => {
      const stringifiedUser = JSON.stringify(user);

      localStorage.setItem('session', stringifiedUser);
    }, [user]);


    const updateAuthForm = useCallback(
      updateFormState(setCredentials),
      []
    );

    const toggleIsLoggedIn = useCallback(() => setLoggingIn(curr => !curr),[]);

    if(user) {


      return <Redirect to="/" />
    }

    return (
        <Row className="border Auth">
          <Col xs={12} sm={4} md={3} className="mx-auto mt-5 p-1">

            <Row className="bg-light p-3 rounded">
            {
              !isLoggingIn ?
                <>
                  <Signup
                      signup={authenticate}
                      updateFormState={updateAuthForm}
                      error={error}
                  />
                  <Button
                    as={Col} className="text-center"
                    onClick={toggleIsLoggedIn}
                    variant="link">
                    Already have an account
                  </Button>
                </>
                :
                <>
                  <Login
                    login={authenticate}
                    updateFormState={updateAuthForm}
                    error={error}
                  />
                  <Button
                    as={Col}
                    className="text-center"
                    onClick={toggleIsLoggedIn}
                    variant="link"
                  >
                    Don't have an account yet
                  </Button>
                </>
            }
            </Row>
          </Col>
        </Row>
    );
}

export default Auth;