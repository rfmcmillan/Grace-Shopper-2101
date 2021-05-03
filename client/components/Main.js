import React from 'react';
import 'core-js';
import 'regenerator-runtime';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import { loadUsers, createUser } from '../store/usersStore';
import CreateUser from './CreateUser.js';
import LogIn from './LogIn.js';

class Main extends React.Component {
  componentDidMount() {
    const { props } = this;
    props.bootstrap();
  }

  render() {
    return (
      <Router>
        <div>
          <Route component={CreateUser} path="/create-user" exact />
          <Route component={LogIn} path="/create-user" exact />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    bootstrap: async () => {
      dispatch(loadUsers());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
