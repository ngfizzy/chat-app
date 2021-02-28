import React, { FC } from 'react';
import { Alert, Button, Form, Row } from 'react-bootstrap';

interface Props {
    error: string;
    signup: (e: React.SyntheticEvent) => any;
    updateFormState: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

const Signup: FC<Props>  = ({signup, updateFormState, error}) => {
    
    return <Form className="col-12" onSubmit={signup}>
        <h2 className="text-center">Sign up</h2>
        {error ?? <Alert variant="primary">{error}</Alert>}

        <Form.Group as={Row}>
            <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                required
                onChange={updateFormState}
            />
        </Form.Group>
        <Form.Group as={Row}>
            <Form.Control

                type="username"
                name="username"
                placeholder="Username"
                required
                onChange={updateFormState}
            />
        </Form.Group>

        <Form.Group as={Row}>
            <Form.Control
                type="email"
                name="email" 
                placeholder="email"
                required
                onChange={updateFormState}
            />
        </Form.Group>

        <Form.Group as={Row}>
            <Form.Control
                autoComplete="on"
                required
                type="password"
                name="password" 
                placeholder="Password"
                onChange={updateFormState}
            />
        </Form.Group>
        
        <Form.Group as={Row}>
            <Button className="col-12" type="submit">Sign up</Button>
        </Form.Group>
    </Form>
};

export default Signup;
