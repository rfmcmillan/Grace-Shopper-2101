import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadCart } from '../store/cart';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // const { getCart } = this.props;
    // const { id } = this.props;
    // getCart(id);
  }

  render() {
    return (
      <div id="cart_container">
        <h1>Cart</h1>
        <div id="Cart" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // const { products } = state;
  // if (!products) {
  //   return 'The cart is empty';
  // }
  // return {
  //   products,
  // };
};

const mapDispatchToProps = (dispatch) => {
  // return {
  //   getCart: () => {
  //     dispatch(loadCart());
  //   },
  // };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
