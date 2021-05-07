import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LogIn from './Login';

const LogInPage = () => {
  return (
    <div>
      <LogIn />
      <Link to="/createaccount">
        <button>Create Account</button>
      </Link>
    </div>
  );
};

export default connect()(LogInPage);
