import React from 'react';
import store from '../store';
import { connect, Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';

class Main extends React.Component {
  render() {
    return (
      <Router>
        <div>Welcome To Global Snacker!</div>
      </Router>
    );
  }
}

export default Main;
