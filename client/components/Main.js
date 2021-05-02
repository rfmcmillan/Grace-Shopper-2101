/* eslint-disable */

import React from 'react';
import 'core-js';
import 'regenerator-runtime';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import { loadUsers } from '../store/usersStore';

import Nav from './Nav';

class Main extends React.Component {
  componentDidMount() {
    const { props } = this;
    props.bootstrap();
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

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    bootstrap: async () => {
      dispatch(loadUsers());
    },
  };
};

<<<<<<< HEAD
// I couldn't get this to work with mapStateToProps or mapDispatchToProps yet
=======
>>>>>>> 1235bcc5f2d3d2e47ee4284ffb5696d8c99295fd
export default connect(mapStateToProps, mapDispatchToProps)(Main);
