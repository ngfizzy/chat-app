import React, { FC } from  'react';
import { Alert, Button, Form, Row } from 'react-bootstrap';

interface Props {
  error: string;
  login: (e: React.SyntheticEvent) => any;
  updateFormState: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

const Login: FC<Props> = ({login, updateFormState, error}) => {
  return <Form className="col-12" onSubmit={login}>
      <h2 className="w-100 text-center">Login</h2>
      
      {error ?? <Alert variant="warning">{error}</Alert>}

      <Form.Group as={Row}>
          <Form.Control 
              type="username"
              name="username"
              placeholder="Username or Email"
              required
              onChange={updateFormState}
          />
      </Form.Group>

      <Form.Group as={Row}>
          <Form.Control
              type="password"
              name="password" 
              placeholder="Password"
              onChange={updateFormState}
              required
              autoComplete="on"
          />
      </Form.Group>
      
      <Form.Group as={Row}>
          <Button className="col-12" type="submit">Login</Button>
      </Form.Group>
  </Form>
};

export default Login;