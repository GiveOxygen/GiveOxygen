import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { Container } from '@material-ui/core';
import DetailForm from 'react-material-final-form';

import metadata from './CustomConfirmSignup.metadata';
import BackNavigatorButton from '../components/BackNavigatorButton';

const CustomConfirmSignUp = ({ onStateChange, authState, authData = {} }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const confirmSignUp = async ({ code }) => {
    try {
      const { email, password } = authData;
      await Auth.confirmSignUp(email, code, {
        // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        forceAliasCreation: true,
      });
      onStateChange('signIn', { email, password, autoLogin: true });
    } catch (e) {
      global.logger.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {}, []);

  if (authState !== 'confirmSignUp') return null;

  return (
    <Container>
      <BackNavigatorButton
        title={'Back to Sign In'}
        onClick={() => onStateChange('signIn')}
      />
      <DetailForm
        title={'Verify Email'}
        metadata={metadata}
        data={{}}
        isLoading={isSubmitting}
        onSubmit={confirmSignUp}
        submitButtonText="Verify"
      />
    </Container>
  );
};

CustomConfirmSignUp.propTypes = {
  onStateChange: PropTypes.func,
  authState: PropTypes.string,
  authData: PropTypes.object,
};

export default CustomConfirmSignUp;
