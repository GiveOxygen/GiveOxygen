import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';

import AdapterNavLink from '../../components/AdapterNavLink';

export const mainListItems = (t) => (
  <div>
    <ListItem button component={AdapterNavLink} to={'/app'}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary={t('dashboard')} />
    </ListItem>
  </div>
);

export const secondaryListItems = (t) => (
  <div>
    {/* <ListSubheader inset>Settings</ListSubheader> */}
    <ListItem button component={AdapterNavLink} to={'/app/user/profile'}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary={t('profile')} />
    </ListItem>
  </div>
);
