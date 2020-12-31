import React, { FC, useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AuthContext } from './store/AuthContext';


interface Props extends RouteProps {
  component: FC<any>;
}

const ProtectedRoute: FC<Props> = ({component: Component, ...rest}) => {
  const {user} = useContext(AuthContext)!;

  return (<Route 
    {...{user, ...rest}}
    render={
      (props) => ( user? 
        <Component {...props} {...{user}}/>
        : 
        <Redirect to={{pathname: 'auth'}} />
      )}/>
  )
  
}

export default ProtectedRoute;
