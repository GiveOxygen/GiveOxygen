import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import request from '../utils/request';
import { getUser } from '../../graphql/queries';
import { createUser } from '../../graphql/mutations';

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
  const [user, setUser] = useState({});
  const logout = async () => {
    await Auth.signOut();
  };

  useEffect(() => {
    (async () => {
      const res = await Auth.currentAuthenticatedUser();
      console.log(res);
      // const groups = res.signInUserSession.accessToken.payload['cognito:groups'];
      const { data: { getUser: result } } = await request(getUser, { email: res.attributes.email });
      if (result) {
        setUser(result);
        return;
      }

      // add user
      const { data: { createUser: savedResult } } = await request(createUser, {
        input: {
          email: res.attributes.email,
          firstName: res.attributes.given_name,
          lastName: res.attributes.family_name,
          phoneNumber: res.attributes.phone_number,
          isEmailVerified: res.attributes.email_verified ? 1 : 0,
          isActive: 1,
          role: res.attributes['custom:role'],
        },
      });
      setUser(savedResult);
    })();
  }, []);

  return (
    <div>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <ListItem>
          <ListItemText primary="Name" secondary={`${user.firstName} ${user.lastName}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Email" secondary={`${user.email}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Phone Number" secondary={`${user.phoneNumber}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Role" secondary={`${user.role}`} />
        </ListItem>
      </List>
      <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
    </div>
  );
};
