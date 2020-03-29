import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { Container } from '@material-ui/core';
import DetailForm from 'react-material-final-form';

import metadata from './CustomSignUp.metadata';
import hospitalMetadata from './Hospital.metadata';
import makerMetadata from './Maker.metadata';

import BackNavigatorButton from '../components/BackNavigatorButton';
import request from '../utils/request';
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
          // 'custom:details': JSON.stringify(details),
        },
      };
      console.log(info);
      await Auth.signUp(info);

      if (role === 'hospitalAdmin') {
        // if id exists, do not create one
        const { data: { createHospital: hospitalData } } = await request(createHospital, {
          input: {
            name: details.hospitalName,
            email: details.hospitalEmail,
            phoneNumber: details.hospitalPhoneNumber,
            address: details.hospitalAddress,
          },
        });
        console.log(hospitalData);
        await request(createHospitalAdmin, {
          input: {
            email,
            firstName,
            lastName,
            phoneNumber,
            jobTitle: details.jobTitle,
            hospitalId: hospitalData.id,
          },
        });
      } else {
        await request(createMaker, {
          input: {
            email,
            firstName,
            lastName,
            phoneNumber,
            jobTitle: details.jobTitle,
            address: details.address,
          },
        });
      }

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
      {
        mode === 'profile' &&
        <DetailForm
          title={'Sign Up'}
          metadata={metadata}
          data={data}
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
          data={{}}
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
          data={{}}
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
