import React from 'react';

import Typography from '@material-ui/core/Typography/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: '#eee',
    padding: theme.spacing(2)
  }
}));


function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography align="center" component="p">
        @2020
      </Typography>
    </footer>
  );
}

export default Footer;
