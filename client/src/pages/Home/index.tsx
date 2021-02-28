import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { IUser } from '../../../../types/models';

const Home:FC<{user: IUser}> = ({user}) => (user? <Redirect to="/chat" />: <Redirect to="/auth" /> );

export default Home;
