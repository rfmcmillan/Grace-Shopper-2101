import React from 'react';
import { connect } from 'react-redux';
import CreateAccount from './CreateAccount';

const LogInPage = () => {
  return (
    <div>
      <CreateAccount />
    </div>
  );
};

export default connect()(LogInPage);