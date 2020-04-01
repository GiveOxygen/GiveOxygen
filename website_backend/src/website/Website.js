import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Grid } from '@material-ui/core';
import Person from '@material-ui/icons/Person';
import queryString from 'query-string';
import { useTranslation } from 'react-i18next';

import LanguageSelector from '../components/LanguageSelector';
import AdapterNavLink from '../components/AdapterNavLink';
import Map from './Map';

const Website = ({ history }) => {
  const { t } = useTranslation();

  const { hideHeader, login, signUp, role } = queryString.parse(window.location.search);

  if (login) {
    history.push('/app');
    return null;
  }

  if (signUp) {
    history.push('/app?signUp=1' + (role ? `&role=${role}` : ''));
    return null;
  }

  return (
    <Container maxWidth={false}>
      {!hideHeader &&
      <Grid container justify="space-between" alignItems="center">
        <h1>
          {t('app.name')}
        </h1>
        <div style={{ flex: 1 }} />
        <Button
          color="primary"
          component={AdapterNavLink}
          target="_self"
          to={'/app?signUp=1'}
        >
          {t('auth.signUp')}
        </Button>
        <Button
          color="primary"
          component={AdapterNavLink}
          target="_self"
          to={'/app'}
        >
          <Person fontSize="inherit" style={{ marginRight: 5, marginLeft: 5 }}/>
          {t('auth.login')}
        </Button>
        <LanguageSelector />
      </Grid>}

      <div style={{ height: hideHeader ? '100vh' : `calc(100vh - 100px)` }}>
        <Map />
      </div>

    </Container>
  );
};

Website.propTypes = {
  history: PropTypes.object,
};

export default Website;
