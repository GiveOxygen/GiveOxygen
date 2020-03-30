import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AdapterNavLink from '../../components/AdapterNavLink';

const BackButton = ({ title = 'back', onClick, to }) => {
  return (
    onClick ?
      <Button
        size="small"
        color="primary"
        onClick={onClick}
      >
        <ChevronLeftIcon fontSize="inherit" />
        {title}
      </Button>:
      <Button
        size="small"
        color="primary"
        component={AdapterNavLink}
        target="_self"
        to={to}
      >
        <ChevronLeftIcon fontSize="inherit" />
        {title}
      </Button>
  );
};

BackButton.propTypes = {
  title: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
};

export default BackButton;
