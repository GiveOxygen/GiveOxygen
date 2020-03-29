import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { Container } from '@material-ui/core';
import DetailForm from 'react-material-final-form';

import metadata from './CustomSignUp.metadata';
import BackNavigatorButton from '../components/BackNavigatorButton';

const CustomSignUp = ({ onStateChange, authState }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({});

  const submit = async ({ email, password, firstName, lastName, phoneNumber, role }) => {
    setIsSubmitting(true);
    try {
      const info = {
        username: email,
        password,
        attributes: {
          'given_name': firstName,
          'family_name': lastName,
          'email': email,
          'phone_number': `+1${phoneNumber}`,
          'custom:role': role,
          // 'custom:details': JSON.stringify(details),
        },
      };
      console.log(info);
      await Auth.signUp(info);
      onStateChange('confirmSignUp', { email, password });
    } catch (e) {
      global.logger.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setData({
        email: 'jhuang@transurban.tech',
        password: 'password',
        firstName: 'John',
        lastName: 'Huang',
        phoneNumber: '6263212768',
        // role: 'maker',
      });
    }
  }, []);

  if (authState !== 'signUp') return null;

  return (
    <Container>
      <BackNavigatorButton
        title={'Back to Sign In'}
        onClick={() => onStateChange('signIn')}
      />
      <DetailForm
        title={'Sign Up'}
        metadata={metadata}
        data={data}
        isLoading={isSubmitting}
        onSubmit={submit}
        submitButtonText="Register"
      />
    </Container>
  );
};

CustomSignUp.propTypes = {
  onStateChange: PropTypes.func,
  authState: PropTypes.string,
};

export default CustomSignUp;
