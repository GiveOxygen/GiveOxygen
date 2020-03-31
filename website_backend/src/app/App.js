import React, { useEffect } from 'react';
import Amplify from 'aws-amplify';
import Analytics from '@aws-amplify/analytics';
import { withAuthenticator } from 'aws-amplify-react';

import config from '../aws-exports';
import authenticatorConfig from '../authenticator.config';
import Dashboard from './dashboard/Dashboard';

import { userSetup } from './Init';
import './App.css';

Amplify.configure(config);
Analytics.disable();

const App = (props) => {
  useEffect(() => {
    userSetup();
  }, []);

  return (
    <Dashboard {...props} />
  );
};

export default withAuthenticator(App, authenticatorConfig);
