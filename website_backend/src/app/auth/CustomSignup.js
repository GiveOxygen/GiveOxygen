import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { Grid, Paper, Avatar } from '@material-ui/core';
import DetailForm from 'react-material-final-form';
import queryString from 'query-string';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../components/LanguageSelector';
// import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

import metadata from './CustomSignUp.metadata';
import hospitalMetadata from './Hospital.metadata';
import makerMetadata from './Maker.metadata';
import SearchHospital from '../../components/SearchHospital';
import BackNavigatorButton from '../components/BackNavigatorButton';

// const phoneUtil = PhoneNumberUtil.getInstance();

const CustomSignUp = ({ onStateChange, authState }) => {
  const { t } = useTranslation();

  // ?signUp=1&role=maker
  // ?signUp=1&role=hospitalAdmin
  const { role: roleFromQueryString } = queryString.parse(window.location.search);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({ role: roleFromQueryString });
  const [profile, setProfile] = useState({});
  const [mode, setMode] = useState('profile');
  const [selectedHospital, setSelectedHospital] = useState(null);

  const next = async (result) => {
    setProfile(result);
    setMode(result.role);
    // search hosital name first
  };

  const register = async (details) => {
    setIsSubmitting(true);

    if (selectedHospital && selectedHospital.id) {
      details.hospitalId = selectedHospital.id;
    }

    const { email, password, firstName, lastName, phoneNumber, role } = profile;
    try {
      // const number = phoneUtil.parseAndKeepRawInput(phoneNumber, country);
      // const formatNumber = phoneUtil.format(number, PhoneNumberFormat.E164);
      const formatNumber = `+${phoneNumber.replace(/\D+/g, '')}`;

      const info = {
        username: email,
        password,
        attributes: {
          'given_name': firstName,
          'family_name': lastName,
          'email': email,
          'phone_number': `${formatNumber}`,
          'custom:role': role,
          'custom:details': JSON.stringify(details),
        },
      };
      await Auth.signUp(info);
      onStateChange('confirmSignUp', { email, password });
    } catch (e) {
      global.logger.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {}, []);

  if (authState !== 'signUp') return null;

  return (
    <Grid container alignItems="center" justify="center" style={{ height: '100vh', paddingTop: 0 }}>
      <Paper style={{ minWidth: 300, width: '50%', maxWidth: '100%', minHeight: 350, padding: 32 }}>
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid container justify="center" alignItems="flex-start" style={{ paddingBottom: 32 }}>
            {/* <BackNavigatorButton
              title={'Back to Home'}
              to={'/'}
            /> */}
            <Avatar alt="Logo" src={`${process.env.PUBLIC_URL}/logo192.png`} style={{ width: 100, height: 100 }} />
          </Grid>
          <div style={{ width: '100%' }}>
            {
              mode === 'profile' &&
              <DetailForm
                // title={'Sign Up'}
                metadata={metadata(t)}
                data={data.profile}
                isLoading={isSubmitting}
                onSubmit={next}
                submitButtonText={t('action.next')}
                submitButtonProps={{
                  variant: 'contained',
                  color: 'primary',
                  type: 'submit',
                  fullWidth: true,
                }}
              />
            }
            {
              mode === 'hospitalAdmin' && !selectedHospital &&
              <React.Fragment>
                <SearchHospital onUpdate={(result)=>{
                  setSelectedHospital(result);
                  setData({
                    hospitalAdmin: {
                      jobTitle: '',
                      hospitalName: result.name,
                      hospitalEmail: result.email || '',
                      hospitalPhoneNumber: result.phoneNumber || '',
                      hospitalAddress: result.address || {},
                    },
                  });
                }}
                />
              </React.Fragment>
            }
            {
              mode === 'hospitalAdmin' && selectedHospital &&
              <DetailForm
                // title={'Hospital'}
                metadata={hospitalMetadata(t)}
                data={data.hospitalAdmin}
                isLoading={isSubmitting}
                onSubmit={register}
                submitButtonText={t('auth.signUp')}
                submitButtonProps={{
                  variant: 'contained',
                  color: 'primary',
                  type: 'submit',
                  fullWidth: true,
                }}
              />
            }
            {
              mode === 'maker' &&
              <DetailForm
                // title={'Maker'}
                metadata={makerMetadata(t)}
                data={data.maker}
                isLoading={isSubmitting}
                onSubmit={register}
                submitButtonText={t('auth.signUp')}
                submitButtonProps={{
                  variant: 'contained',
                  color: 'primary',
                  type: 'submit',
                  fullWidth: true,
                }}
              />
            }
          </div>

          <Grid container justify="space-between" style={{ paddingTop: 24 }}>
            <BackNavigatorButton
              title={t('action.backToSignIn')}
              onClick={() => onStateChange('signIn')}
            />
            <LanguageSelector />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

CustomSignUp.propTypes = {
  onStateChange: PropTypes.func,
  authState: PropTypes.string,
};

export default CustomSignUp;
