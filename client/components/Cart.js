/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadCart, updateCart } from '../store/cart';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.getCart(this.props.user.cart);
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { name } = evt.target.querySelector('input');
    let cart = null;
    this.props.updateItem(cart, name, this.state[name]);
    window.location.reload();
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
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
                <h4>{product.amount}</h4>
                <form onSubmit={this.handleSubmit}>
                  <input name={`${product.id}`} type="number" min="1" defaultValue={product.amount} onChange={this.handleChange} />
                  <button type="submit">
                    Update Amount
                  </button>
                </form>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { cart, user } = state;
  return {
    cart, user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: (id) => {
      dispatch(loadCart(id));
    },
    updateItem: (cart, orderId, amount) => {
      dispatch(updateCart(cart, orderId, amount));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
