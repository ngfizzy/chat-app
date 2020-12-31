import React, { useContext } from 'react';
import { AuthContext } from '../../../store/AuthContext';


const Chat = () => {
    const {user}=  useContext(AuthContext)!;
    
    return <h1>Welcome { user?.username }</h1>;
}

export default Chat;