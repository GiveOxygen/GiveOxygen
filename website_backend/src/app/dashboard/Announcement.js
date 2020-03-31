import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
  context: {
    // flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
});

const Announcement = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Thank you for signup.</Title>
      {/* <Typography component="p" variant="h4">
        Thank you for signup.
      </Typography> */}
      <Typography color="textSecondary" className={classes.context}>
        We will be sending you an email with further instructions,
        in the meantime we are redirecting you to the main page
        which has the latest information on the project build and coordination.
      </Typography>
      <div>
        <Link color="primary" href="https://www.giveoxygen.com" target="_blank">
          Go to GiveOxygen.com
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Announcement;
