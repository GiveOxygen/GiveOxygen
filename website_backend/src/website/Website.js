import React from 'react';
import { Container, Button, Grid } from '@material-ui/core';

import AdapterNavLink from '../components/AdapterNavLink';
import Map from './Map';

const Website = () => {
  return (
    <Container maxWidth={false}>
      <Grid container justify="space-between" alignItems="center">
        <h1>Give Oxygen Map</h1>
        <Button
          color="primary"
          component={AdapterNavLink}
          target="_self"
          to={'/app'}
        >
          Hospital Admin / Maker Login
        </Button>
      </Grid>

      <Map />

    </Container>
  );
};

export default Website;
