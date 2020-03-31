import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DetailForm from 'react-material-final-form';

import MakerMetadata from './Maker.metadata';

import request from '../../utils/request';
import { getHospitalAdmin, getMaker } from '../../graphql/queries';
import { updateMaker } from '../../graphql/mutations';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default () => {
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState({});

  const update = async (data) => {
    setIsSubmitting(true);
    delete data.createdAt;
    delete data.updatedAt;
    if (data.address && !data.address.street2) {
      data.address.street2 = ' ';
    }

    const { data: { updateMaker: result } } = await request(updateMaker, {
      input: data,
    });
    setIsSubmitting(false);
  };

  useEffect(() => {
    (async () => {
      const res = await Auth.currentAuthenticatedUser();
      const {
        'custom:role': role,
        email,
      } = res.attributes;
      if (role === 'hospitalAdmin') {
        const { data: { getHospitalAdmin: result } } = await request(getHospitalAdmin, { email });
        result && setUser(result);
      } else
      if (role === 'maker') {
        const { data: { getMaker: result } } = await request(getMaker, { email });
        result && setUser(result);
      }
    })();
  }, []);

  return (
    <Paper style={{ padding: 16 }}>
      <DetailForm
        // title={'Sign Up'}
        metadata={MakerMetadata}
        data={user}
        isLoading={isSubmitting}
        onSubmit={update}
        submitButtonText="Update"
        submitButtonProps={{
          variant: 'contained',
          color: 'primary',
          type: 'submit',
          fullWidth: true,
        }}
      />
    </Paper>
  );
};
