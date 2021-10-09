import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LogIn from './Login';
import { Paper } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Button } from '@material-ui/core';

const LogInPage = () => {
  const theme = useTheme();
  const useStyles = makeStyles({
    contain: {
      padding: 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: '33vw',
    },
  });
  const classes = useStyles();

  return (
    <Paper className={classes.contain}>
      <div id="login-item">
        <LogIn id="login-button" />
        <Link to="/createaccount">
          <Button variant="contained" id="quick-add">
            Create Account
          </Button>
        </Link>
      </div>
    </Paper>
  );
};

export default connect()(LogInPage);
