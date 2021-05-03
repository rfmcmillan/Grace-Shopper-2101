/* eslint-disable */

import React from 'react';
import 'core-js';
import 'regenerator-runtime';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { loadUsers, createUser } from '../store/usersStore';
import AllProducts from './AllProducts';
import SingleProduct from './SingleProduct';
import LogInPage from './LogInPage';

import Nav from './Nav';
import Home from './Home';
class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: {},
    };
  }

  render() {
    return (
      <Router>
        <div id="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/products/:id" component={SingleProduct} />
          </Switch>
          <Route component={LogInPage} path="/login" exact />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(Main);
