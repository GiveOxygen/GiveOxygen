import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Grid } from '@material-ui/core';
import Person from '@material-ui/icons/Person';
import queryString from 'query-string';

import AdapterNavLink from '../components/AdapterNavLink';
import Map from './Map';

const Website = ({ history }) => {
  const { hideHeader, login } = queryString.parse(window.location.search);

  if (login) {
    history.push('/app');
    return null;
  }

  return (
    <Container maxWidth={false}>
      {!hideHeader &&
      <Grid container justify="space-between" alignItems="center">
        <h1>Give Oxygen Map</h1>
        <Button
          color="primary"
          component={AdapterNavLink}
          target="_self"
          to={'/app'}
        >
          <Person fontSize="inherit" style={{ marginRight: 5, marginLeft: 5 }}/>
          Login
        </Button>
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
