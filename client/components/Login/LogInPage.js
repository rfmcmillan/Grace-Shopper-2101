import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LogIn from './Login';
import { Paper, Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Button } from '@material-ui/core';

const LogInPage = () => {
  const theme = useTheme();
  const useStyles = makeStyles({
    contain: {
      margin: 'auto',
      padding: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: 400,
    },
    create: {
      fontFamily: theme.typography.fontFamily,
      fontSize: 12,
      marginTop: 10,
    },
  });
  const classes = useStyles();

  return (
    <Box
      sx={{
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Paper className={classes.contain}>
        <LogIn id="login-button" />
        <Link className={classes.create} to="/createaccount">
          Create an Account
        </Link>
      </Paper>
    </Box>
  );
};

export default connect()(LogInPage);
