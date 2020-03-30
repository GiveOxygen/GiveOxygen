import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { Container, Button } from '@material-ui/core';
import DetailForm from 'react-material-final-form';

import metadata from './CustomSignIn.metadata';
import BackNavigatorButton from '../components/BackNavigatorButton';

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

  return (
    <Container>
      <BackNavigatorButton
        title={'Back to Home'}
        to={'/'}
      />
      <DetailForm
        title={'Sign In'}
        metadata={metadata}
        data={data}
        isLoading={isSubmitting}
        onSubmit={submit}
        submitButtonText="Login"
      />
      <Button onClick={()=>onStateChange('signUp')}>
        Sign up new account
      </Button>
      <Button onClick={()=>onStateChange('forgotPassword')}>
        Forgot Password
      </Button>
    </Container>
  );
};

CustomSignIn.propTypes = {
  onStateChange: PropTypes.func,
  authState: PropTypes.string,
  authData: PropTypes.object,
};

export default CustomSignIn;
