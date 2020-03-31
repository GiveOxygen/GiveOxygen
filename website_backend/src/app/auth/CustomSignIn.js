import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import {
  Grid,
  Button,
  Paper,
  Divider,
  Avatar,
} from '@material-ui/core';
import DetailForm from 'react-material-final-form';
import queryString from 'query-string';

import metadata from './CustomSignIn.metadata';
// import BackNavigatorButton from '../components/BackNavigatorButton';

let hasRedirected = false;
const CustomSignIn = ({ onStateChange, authState, authData = {} }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({});

  const submit = async ({ email, password }) => {
    setIsSubmitting(true);
    window.localStorage.setItem('email', email);

    try {
      const user = await Auth.signIn(email, password);
      global.logger.debug(user);

      if (user.challengeName === 'SMS_MFA' ||
        user.challengeName === 'SOFTWARE_TOKEN_MFA') {
        // // You need to get the code from the UI inputs
        // // and then trigger the following function with a button click
        // const code = getCodeFromUserInput();
        // // If MFA is enabled, sign-in should be confirmed with the confirmation code
        // const loggedUser = await Auth.confirmSignIn(
        //   user, // Return object from Auth.signIn()
        //   code, // Confirmation code
        //   mfaType // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
        // );
      } else
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        // this.setState({ requestNewPassword: true })
      } else
      if (user.challengeName === 'MFA_SETUP') {
        // // This happens when the MFA method is TOTP
        // // The user needs to setup the TOTP before using it
        // // More info please check the Enabling MFA part
        // Auth.setupTOTP(user);
      } else {
        // The user directly signs in
        onStateChange('signedIn');
      }
    } catch (err) {
      if (err.code === 'UserNotConfirmedException') {
        // The error happens if the user didn't finish the confirmation step when signing up
        // In this case you need to resend the code and confirm the user
        // About how to resend the code and confirm the user, please check the signUp part
        onStateChange('confirmSignUp', { email, password });
      } else if (err.code === 'PasswordResetRequiredException') {
        // The error happens when the password is reset in the Cognito console
        // In this case you need to call forgotPassword to reset the password
        // Please check the Forgot Password part.
      } else if (err.code === 'NotAuthorizedException') {
        // The error happens when the incorrect password is provided
      } else if (err.code === 'UserNotFoundException') {
        // The error happens when the supplied username/email does not exist in the Cognito user pool
      } else {
        //
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (authData && authData.email && authData.password && !data.password && authData.autoLogin) {
      submit({
        email: authData.email,
        password: authData.password,
      });
    }
  });

  useEffect(() => {
    const cachedEmail = window.localStorage.getItem('email');
    if (cachedEmail) {
      setData({
        email: cachedEmail,
        password: '',
      });
    }
  }, []);


  if (authState !== 'signIn') return null;

  const { signUp } = queryString.parse(window.location.search);
  if (signUp && !hasRedirected) {
    hasRedirected = true;
    onStateChange('signUp');
    return null;
  }

  return (
    <Grid container alignItems="center" justify="center" style={{ height: '100vh', paddingTop: 0 }}>
      <Paper style={{ width: 300, maxWidth: '100%', padding: 32 }}>
        <Grid container justify="center" alignItems="flex-start" style={{ paddingBottom: 32 }}>
          {/* <BackNavigatorButton
            title={'Back to Home'}
            to={'/'}
          /> */}
          <Avatar alt="Logo" src={`${process.env.PUBLIC_URL}/logo192.png`} style={{ width: 100, height: 100 }} />
        </Grid>
        <DetailForm
          // title={'Give Oxygen Sign In'}
          metadata={metadata}
          data={data}
          isLoading={isSubmitting}
          onSubmit={submit}
          submitButtonText="Login"
          submitButtonProps={{
            variant: 'contained',
            color: 'primary',
            type: 'submit',
            fullWidth: true,
          }}
        />
        <Grid container justify="flex-end" alignItems="center" direction="column" style={{ paddingTop: 32 }}>
          <Divider />
          <Button onClick={()=>onStateChange('signUp')}>
            Sign up new account
          </Button>
          <Divider />
          <Button
            onClick={()=>onStateChange('forgotPassword')}
          >
            Forgot Password
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

CustomSignIn.propTypes = {
  onStateChange: PropTypes.func,
  authState: PropTypes.string,
  authData: PropTypes.object,
};

export default CustomSignIn;
