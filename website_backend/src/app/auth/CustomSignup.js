import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { Container } from '@material-ui/core';
import DetailForm from 'react-material-final-form';

import metadata from './CustomSignUp.metadata';
import hospitalMetadata from './Hospital.metadata';
import makerMetadata from './Maker.metadata';

import BackNavigatorButton from '../components/BackNavigatorButton';
import request from '../../utils/request';
import { createHospitalAdmin, createHospital, createMaker } from '../../graphql/mutations';

const CustomSignUp = ({ onStateChange, authState }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({});
  const [profile, setProfile] = useState({});
  const [mode, setMode] = useState('profile');

  const next = async (result) => {
    setProfile(result);
    setMode(result.role);
    // search hosital name first
  };

  const register = async (details) => {
    setIsSubmitting(true);

    const { email, password, firstName, lastName, phoneNumber, role } = profile;
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
          'custom:details': JSON.stringify(details),
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
        profile: {
          email: 'jhuang@transurban.tech',
          password: 'password',
          firstName: 'John',
          lastName: 'Huang',
          phoneNumber: '6263212768',
          // role: 'maker',
        },
        hospitalAdmin: {
          jobTitle: 'Doctor',
          hospitalName: 'Hoag',
          hospitalEmail: 'info@hoag.org',
          hospitalPhoneNumber: '6263212768',
          hospitalAddress: {
            street: '123 Sand canyon ave',
            city: 'Irvine',
            state: 'CA',
            zipCode: '9260',
          },
        },
        maker: {

        },
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
      {
        mode === 'profile' &&
        <DetailForm
          title={'Sign Up'}
          metadata={metadata}
          data={data.profile}
          isLoading={isSubmitting}
          onSubmit={next}
          submitButtonText="Next"
        />
      }
      {
        mode === 'hospitalAdmin' &&
        <DetailForm
          title={'Hospital'}
          metadata={hospitalMetadata}
          data={data.hospitalAdmin}
          isLoading={isSubmitting}
          onSubmit={register}
          submitButtonText="Register"
        />
      }
      {
        mode === 'maker' &&
        <DetailForm
          title={'Maker'}
          metadata={makerMetadata}
          data={data.maker}
          isLoading={isSubmitting}
          onSubmit={register}
          submitButtonText="Register"
        />
      }
    </Container>
  );
};

CustomSignUp.propTypes = {
  onStateChange: PropTypes.func,
  authState: PropTypes.string,
};

export default CustomSignUp;
