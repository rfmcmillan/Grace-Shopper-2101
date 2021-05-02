import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { loadUsers } from '../store';
import AllProducts from './AllProducts';
import SingleProduct from './SingleProduct';

class Main extends React.Component {
  componentDidMount() {
    this.props.bootstrap();
  }

  render() {
    return (
      <Router>
        <div>Welcome To Global Snacker!</div>
        <Route exact path="/products" component={AllProducts} />
        <Switch>
          <Route exact path="/products/:id" component={SingleProduct} />
        </Switch>
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

//I couldn't get this to work with mapStateToProps or mapDispatchToProps yet
export default connect(mapStateToProps, mapDispatchToProps)(Main);
