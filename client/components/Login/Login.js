import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { updateUser, loadUsers, resetPassword } from '../../store/users';
import { loginUser } from '../../store/loginstate';

const LogIn = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const { email, password } = state;
  const theme = useTheme();
  const useStyles = makeStyles({
    email: { marginTop: 10 },
    loginButton: {
      flex: 1,
      left: 54,
      marginTop: '1rem',
      margin: '0.2rem',
    },
    password: {
      marginTop: 10,
    },
    welcome: {
      fontSize: 20,
      marginBottom: 20,
    },
  });
  const classes = useStyles();

  const onChange = (event) => {
    const change = {};
    change[event.target.name] = event.target.value;
    setState(change);
  };

  const handleLogin = (event, email, password) => {
    event.preventDefault();
    dispatch(loginUser(email, password));
    window.location.hash = '/products';
  };

  return (
    <Box
      className={classes.root}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography className={classes.welcome} variant="h1">
        Welcome to Global Snacker!
      </Typography>
      <Typography>Please Log In:</Typography>
      <form>
        <TextField
          className={classes.email}
          required
          label="Email Address"
          variant="outlined"
          name="email"
          value={email}
          onChange={onChange}
        />
        <br />

        <TextField
          className={classes.password}
          required
          label="Password"
          variant="outlined"
          name="password"
          value={password}
          onChange={onChange}
        />
        <br />
        <Button
          className={classes.loginButton}
          onClick={(event) => {
            return handleLogin(event, email, password);
          }}
          variant="contained"
          color="primary"
        >
          Log In
        </Button>
      </form>
    </Box>
  );
};
export default LogIn;
