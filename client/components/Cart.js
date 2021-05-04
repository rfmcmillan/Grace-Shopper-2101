/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadCart } from '../store/cart';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("ererererererersdfsfdsererer")
    if (this.props.user) {
      this.props.getCart(this.props.user.cart);
    }
  }

  render() {
    const { cart } = this.props;
    return (
      <div id="cart_container">
        <h1>Cart</h1>

        <div id="Cart">
          {cart.map((product) => {
            return (
              <div key={product.id} className="product">
                <Link to={`/products/${product.id}`}>
                  <h3>{`${product.title}`}</h3>
                </Link>
                <h4>
                  {product.country.name}
                  <i className={`em ${product.country.flag}`} />
                </h4>

                <img
                  className="allProductImage"
                  src={product.imageUrl}
                  alt={product.description}
                />

                <button>
                  Remove From Cart/Update Amount
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { cart } = state;
  if (!cart) {
    return 'The cart is empty';
  }
  return {
    cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: (id) => {
      dispatch(loadCart(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
