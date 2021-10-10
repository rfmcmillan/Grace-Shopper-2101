import React from 'react';
import { connect } from 'react-redux';
import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CreateAccount from './CreateAccount';

const CreateAccountPage = () => {
  const useStyles = makeStyles({
    contain: {
      margin: 'auto',
      padding: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: 400,
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
      </Paper>
    </Box>
  );
};

export default connect()(CreateAccountPage);
