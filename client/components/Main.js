/* eslint-disable */

import React from 'react';
import 'core-js';
import 'regenerator-runtime';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import AllProducts from './AllProducts';
import SingleProduct from './SingleProduct/SingleProduct';
import LogInPage from './LogInPage';
import ManageUsers from './ManageUsers';

import Nav from './Nav';
import Home from './Home';
class Main extends React.Component {
  render() {
    return (
      <Router>
        <div id="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route exact path="/manage-users" component={ManageUsers} />
          </Switch>
          <Route component={LogInPage} path="/login" exact />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(Main);
