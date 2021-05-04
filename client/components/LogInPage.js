import React from 'react';
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
