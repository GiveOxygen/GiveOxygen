import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

import Title from './Title';

const useStyles = makeStyles({
  context: {
    // flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
});

const Announcement = () => {
  const { t } = useTranslation();

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>{t('annoucement.title')}</Title>
      <Typography color="textSecondary" className={classes.context}>
        {t('annoucement.content')}
      </Typography>
      <div>
        <Link color="primary" href="https://www.giveoxygen.com" target="_blank">
          {t('action.goTo')} GiveOxygen.com
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Announcement;
