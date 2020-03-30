import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import request from '../../utils/request';
import { getHospitalAdmin, getMaker } from '../../graphql/queries';
import { createHospitalAdmin, createHospital, createMaker } from '../../graphql/mutations';

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
      const {
        'custom:role': role,
        'custom:details': details,
        email,
        family_name: lastName,
        given_name: firstName,
        phone_number: phoneNumber,
      } = res.attributes;
      // const groups = res.signInUserSession.accessToken.payload['cognito:groups'];

      if (role === 'hospitalAdmin') {
        const { data: { getHospitalAdmin: result } } = await request(getHospitalAdmin, { email });
        if (result) {
          setUser(result);
        } else {
          const {
            hospitalId: inHospitalId,
            hospitalName,
            hospitalEmail,
            hospitalPhoneNumber,
            hospitalAddress,
            jobTitle,
            coordinates,
          } = JSON.parse(details);

          let hospitalId = inHospitalId;

          if (!hospitalId) {
            const { data: { createHospital: hospitalData } } = await request(createHospital, {
              input: {
                name: hospitalName,
                email: hospitalEmail,
                phoneNumber: hospitalPhoneNumber,
                address: hospitalAddress,
                coordinates: {
                  latitude: coordinates[0],
                  longitude: coordinates[1],
                },
              },
            });
            console.log(hospitalData);
            hospitalId = hospitalData.id;
          }

          const { data: { createHospitalAdmin: createHospitalAdminResult } } = await request(createHospitalAdmin, {
            input: {
              email,
              firstName,
              lastName,
              phoneNumber,
              jobTitle: jobTitle,
              hospitalId,
            },
          });
          setUser(createHospitalAdminResult);
        }
      } else
      if (role === 'maker') {
        const { data: { getMaker: result } } = await request(getMaker, { email });
        if (result) {
          setUser(result);
        } else {
          const {
            address,
            jobTitle,
            coordinates,
          } = JSON.parse(details);
          const { data: { createMaker: createMakerResult } } = await request(createMaker, {
            input: {
              email,
              firstName,
              lastName,
              phoneNumber,
              jobTitle,
              address,
              coordinates: {
                latitude: coordinates[0],
                longitude: coordinates[1],
              },
            },
          });
          setUser(createMakerResult);
        }
      }
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
      </List>
      <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
    </div>
  );
};
