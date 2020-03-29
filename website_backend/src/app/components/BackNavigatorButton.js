import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const BackButton = ({ title = 'back', onClick }) => {
  return (
    <Button
      size="small"
      onClick={onClick}
    >
      <ChevronLeftIcon fontSize="inherit" />
      {title}
    </Button>
  );
};

BackButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default BackButton;
