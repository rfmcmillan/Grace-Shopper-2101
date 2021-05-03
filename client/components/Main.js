import React from 'react';
import 'core-js';
import 'regenerator-runtime';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { loadUsers, createUser } from '../store/usersStore';
import AllProducts from './AllProducts';
import SingleProduct from './SingleProduct';
import LogInPage from './LogInPage';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: {},
    };
  }

  componentDidMount() {
    const { props } = this;
    props.bootstrap();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/products" component={AllProducts} />
          <Route exact path="/products/:id" component={SingleProduct} />
          <Route component={LogInPage} path="/login" exact />
        </Switch>
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
