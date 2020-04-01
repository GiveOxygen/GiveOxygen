import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import AdapterNavLink from '../../components/AdapterNavLink';

export const mainListItems = (
  <div>
    <ListItem button component={AdapterNavLink} to={'/app'}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    {/* <ListSubheader inset>Settings</ListSubheader> */}
    <ListItem button component={AdapterNavLink} to={'/app/user/profile'}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="My Profile" />
    </ListItem>
  </div>
);
