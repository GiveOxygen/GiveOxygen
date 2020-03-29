import React from 'react';
import { Container, Button } from '@material-ui/core';

import AdapterNavLink from '../components/AdapterNavLink';
import Map from './Map';

const Website = () => {
  return (
    <Container>
      <h1>Give Oxygen</h1>
      <Map />
      <Button
        color="primary"
        component={AdapterNavLink}
        target="_self"
        to={'/app'}
      >
        Hospital Admins / Suppliers Login
      </Button>
    </Container>
  );
};

export default Website;
