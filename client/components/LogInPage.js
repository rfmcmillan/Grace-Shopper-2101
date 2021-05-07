import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LogIn from './Login';
import { Button } from '@material-ui/core';

const LogInPage = () => {
  return (
    <div id="login-contain">
      <div id="login-item">
        <LogIn id="login-button" />
        <Link to="/createaccount">
          <Button variant="contained" id="quick-add">
            Create Account
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default connect()(LogInPage);
