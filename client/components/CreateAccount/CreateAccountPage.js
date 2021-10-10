import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import CreateAccount from './CreateAccount';

const CreateAccountPage = () => {
  const theme = useTheme();
  const useStyles = makeStyles({
    already: { fontSize: 12 },
    contain: {
      margin: 'auto',
      padding: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: 400,
    },
    login: {
      fontFamily: theme.typography.fontFamily,
      fontSize: 12,
      marginLeft: 5,
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
        <CreateAccount />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography className={classes.already}>
            Already have an account?
          </Typography>
          <Link className={classes.login} to="/login">
            Log in here.
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default connect()(CreateAccountPage);
