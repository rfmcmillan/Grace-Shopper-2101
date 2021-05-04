/* eslint-disable */

import React from 'react';
import 'core-js';
import 'regenerator-runtime';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { loadUsers, createUser } from '../store/usersStore';
import AllProducts from './AllProducts';
import SingleProduct from './SingleProduct';
import LogIn from './LogIn.js';
import CreateAccount from './CreateAccount.js';
import Cart from './Cart'

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
          <Nav />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route exact path="/cart" componenet={Cart}/>
          </Switch>
          <Route component={LogIn} path="/login" exact />
          <Route component={CreateAccount} path="/login" exact />
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
