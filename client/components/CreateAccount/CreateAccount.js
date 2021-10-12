import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/styles';
import { createUser } from '../../store/users';
import {
  Button,
  TextField,
  Typography,
  Box,
  FormControl,
} from '@material-ui/core';

const CreateAccount = (props) => {
  const theme = useTheme();
  const useStyles = makeStyles({
    button: {
      width: 200,
      backgroundColor: theme.palette.text.primary,
      color: theme.palette.secondary.contrastText,
    },
    createForm: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: { width: 200 },
    textField: {},
    title: {
      marginBottom: 20,
      fontSize: 20,
    },
  });

  const classes = useStyles();

  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    error: '',
  });
  const { email, password, firstName, lastName } = state;

  const onChange = (ev) => {
    const change = {};
    change[ev.target.name] = ev.target.value;
    setState(change);
  };

  const onSave = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(createUser(email, password, firstName, lastName));
      window.location.hash = 'login';
    } catch (error) {
      setState({ error: error.response.data.error });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        margin: 10,
      }}
    >
      <Typography className={classes.title}>Create An Account</Typography>
      <FormControl className={classes.form} onSubmit={onSave}>
        <TextField
          className={classes.textField}
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
          className={classes.textField}
          required
          label="Password"
          name="password"
          variant="outlined"
          value={password}
          onChange={onChange}
          size="small"
        />
        <br />
        <TextField
          className={classes.textField}
          label="First Name"
          name="firstName"
          variant="outlined"
          value={firstName}
          onChange={onChange}
          size="small"
        />
        <br />
        <TextField
          className={classes.textField}
          label="Last Name"
          name="lastName"
          variant="outlined"
          value={lastName}
          onChange={onChange}
          size="small"
        />
        <br />
        <Button className={classes.button} variant="contained" onClick={onSave}>
          Create Account
        </Button>
      </FormControl>
    </Box>
  );
};

export default CreateAccount;
