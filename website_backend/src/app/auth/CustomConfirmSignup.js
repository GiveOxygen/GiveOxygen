import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { Grid, Paper } from '@material-ui/core';
import DetailForm from 'react-material-final-form';
import { useTranslation } from 'react-i18next';

import metadata from './CustomConfirmSignup.metadata';
import BackNavigatorButton from '../components/BackNavigatorButton';

const CustomConfirmSignUp = ({ onStateChange, authState, authData = {} }) => {
  const { t } = useTranslation();

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
    <Grid container alignItems="center" justify="center" style={{ height: '100vh', paddingTop: 0 }}>
      <Paper style={{ width: 300, maxWidth: '100%', padding: 32 }}>
        <DetailForm
          title={t('auth.verifyEmail')}
          metadata={metadata(t)}
          data={{}}
          isLoading={isSubmitting}
          onSubmit={confirmSignUp}
          submitButtonText={t('action.verify')}
          submitButtonProps={{
            variant: 'contained',
            color: 'primary',
            type: 'submit',
            fullWidth: true,
          }}
        />
        <div style={{ paddingTop: 24 }}>
          <BackNavigatorButton
            title={t('action.backToSignIn')}
            onClick={() => onStateChange('signIn')}
          />
        </div>
      </Paper>
    </Grid>
  );
};

CustomConfirmSignUp.propTypes = {
  onStateChange: PropTypes.func,
  authState: PropTypes.string,
  authData: PropTypes.object,
};

export default CustomConfirmSignUp;
