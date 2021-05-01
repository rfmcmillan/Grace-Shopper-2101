import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Nav from './Nav';

class Main extends React.Component {
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

export default Main;
