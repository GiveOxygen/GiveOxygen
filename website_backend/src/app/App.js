import React from 'react';
import Amplify from 'aws-amplify';
import Analytics from '@aws-amplify/analytics';
import { withAuthenticator } from 'aws-amplify-react';
import { Container } from '@material-ui/core';

import config from '../aws-exports';
import authenticatorConfig from '../authenticator.config';
import UserProfile from './components/UserProfile';
import './App.css';

Amplify.configure(config);
Analytics.disable();

const App = () => {
  return (
    <Container>
      <h1>Give Oxygen</h1>
      <UserProfile />
    </Container>
  );
};

export default withAuthenticator(App, authenticatorConfig);
