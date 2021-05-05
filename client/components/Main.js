/* eslint-disable */

import React from 'react';
import 'core-js';
import 'regenerator-runtime';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import AllProducts from './AllProducts';
import CreateAccount from './CreateAccount.js';
import Cart from './Cart'
import SingleProduct from './SingleProduct/SingleProduct';
import LogInPage from './LogInPage';
import ManageUsers from './ManageUsers';

import Nav from './Nav';
import Home from './Home';
import CreateAccountPage from './CreateAccountPage';
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
            <Route exact path="/cart" component={Cart}/>
            <Route exact path="/login" component={LogInPage} />
            <Route exact path="/createaccount" component={CreateAccountPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(Main);
