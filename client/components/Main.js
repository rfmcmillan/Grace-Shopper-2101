/* eslint-disable */

import React from 'react';
import 'core-js';
import 'regenerator-runtime';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { loadUsers } from '../store/usersStore';

import Nav from './Nav';
import Home from './Home';
class Main extends React.Component {
  componentDidMount() {
    const { props } = this;
    props.bootstrap();
  }

  render() {
    return (
      <Router>
        <div id="container">
          <Route exact path="/" component={Home}></Route>{' '}
          <Switch>
            <Route exact path="/" component={Home}></Route>{' '}
            <Route component={Nav}></Route>
          </Switch>
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
