/* eslint-disable */

import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import { loadUsers } from '../store';

import Nav from './Nav';

class Main extends React.Component {
  componentDidMount() {
    this.props.bootstrap();
  }

  render() {
    return (
      <Router>
        <div id="container">
          <Nav />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    bootstrap: async () => {
      dispatch(loadUsers());
    },
  };
};

// I couldn't get this to work with mapStateToProps or mapDispatchToProps yet
export default connect(mapStateToProps, mapDispatchToProps)(Main);
