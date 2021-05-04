import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import LogIn from './LogIn';
import CreateAccount from './CreateAccount';

const LogInPage = () => {
  return (
    <div>
      <CreateAccount />
      <LogIn />
    </div>
  );
};

export default connect()(LogInPage);
