/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadCart, updateCart, removeItem } from '../store/cart';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    if (this.props.login.cart) {
      this.props.getCart(this.props.login.cart);
    }
  }

  handleRemove(id) {
    let orderId = null;
    if (this.props.login.cart) {
      orderId = this.props.login.cart;
    }
    this.props.removeItem(orderId, id);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { name } = evt.target.querySelector('input');
    let orderId = null;
    if (this.props.login.cart) {
      orderId = this.props.login.cart;
    }
    this.props.updateItem(orderId, name, this.state[name]);
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
                  <input name={`${product.id}`} type="number" min="1" defaultValue={null} onChange={this.handleChange} />
                  <button type="submit">
                    Update Amount
                  </button>
                </form>
                <button onClick={() => { return this.handleRemove(product.id); }}>
                  Delete Item
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
  const { login, cart } = state;
  return {
    login, cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: (id) => {
      dispatch(loadCart(id));
    },
    updateItem: (cart, product, amount) => {
      dispatch(updateCart(cart, product, amount));
    },
    removeItem: (cart, productId) => {
      dispatch(removeItem(cart, productId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
