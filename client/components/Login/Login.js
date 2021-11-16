import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { updateUser, loadUsers, resetPassword } from '../../store/users';
import { loginUser } from '../../store/loginstate';

const LogIn = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const useStyles = makeStyles({
    email: { marginTop: 10 },
    form: { width: 200 },
    loginButton: {
      width: 200,
      backgroundColor: theme.palette.text.primary,
      color: theme.palette.secondary.contrastText,
    },
    password: {},
    welcome: {
      fontSize: 20,
      marginBottom: 10,
    },
  });
  const classes = useStyles();

  const onChange = (event) => {
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };

  const handleLogin = (event, email, password) => {
    event.preventDefault();
    dispatch(loginUser(email, password));
    window.location.hash = '/products';
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography className={classes.welcome}>
        Welcome to Global Snacker!
      </Typography>
      <Typography>Please Log In:</Typography>
      <FormControl className={classes.form}>
        <TextField
          className={classes.email}
          required
          label="Email Address"
          variant="outlined"
          name="email"
          value={email}
          onChange={onChange}
          size="small"
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
          size="small"
        />
        <br />
        <Button
          className={classes.loginButton}
          onClick={(event) => {
            handleLogin(event, email, password);
          }}
          variant="contained"
          color="primary"
        >
          Log In
        </Button>
      </FormControl>
    </Box>
  );
};
export default LogIn;
