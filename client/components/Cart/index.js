/* eslint-disable class-methods-use-this */
/* eslint-disable react/button-has-type */
import React, { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import {
  loadCart,
  updateCart,
  removeItem,
  purchaseItems,
} from '../../store/cart';

const stripePromise = loadStripe(
  'pk_test_51InvgGCzEJe0jWa9qmsLFyAIhV0dMwJeA59eCJtu4leBd9h8TcouHwM2OG1c691aHwIWcSebkNRCKTboOy2frM0p001MLpy1xK'
);

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const { location } = props;

  // componentDidMount() {
  //   if (this.props.login.cart) {
  //     this.props.getCart(this.props.login.cart);
  //   }

  //   const query = new URLSearchParams(this.props.location.search);
  //   if (query.get('success')) {
  //     const items = this.props.cart.map((e) => {
  //       return { amount: e.amount, item: e };
  //     });

  //     const orderId = this.props.login.cart || null;
  //     const userId = this.props.login.id || null;
  //     const date = new Date().toISOString().split('T')[0];

  //     this.props.purchase(date, items, orderId, userId);
  //   }
  //   if (query.get('canceled')) {
  //     window.alert(
  //       "Order canceled -- continue to shop around and checkout when you're ready."
  //     );
  //   }
  // }

  useEffect(() => {
    if (login.cart) {
      dispatch(loadCart(login.cart));
    }

    const query = new URLSearchParams(location.search);
    if (query.get('success')) {
      const items = cart.map((e) => {
        return { amount: e.amount, item: e };
      });

      const orderId = login.cart || null;
      const userId = login.id || null;
      const date = new Date().toISOString().split('T')[0];

      dispatch(purchaseItems(date, items, orderId, userId));
    }
    if (query.get('canceled')) {
      window.alert(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const handleRemove = (id) => {
    let orderId = null;
    if (login.cart) {
      orderId = login.cart;
    }
    dispatch(removeItem(orderId, id));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { name } = evt.target.querySelector('input');
    let orderId = null;
    if (login.cart) {
      orderId = login.cart;
    }
    dispatch(updateCart(orderId, name, this.state[name]));
    window.location.reload();
  };

  const handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  const handleClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await axios.post(
      'api/order/create-checkout-session',
      cart
    );
    const { data } = response;

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });
  };

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
              <form onSubmit={handleSubmit}>
                <input
                  name={`${product.id}`}
                  type="number"
                  min="1"
                  defaultValue={null}
                  onChange={handleChange}
                />
                <button type="submit">Update Amount</button>
              </form>
              <button
                onClick={() => {
                  return handleRemove(product.id);
                }}
              >
                Delete Item
              </button>
            </div>
          );
        })}
      </div>
      <button onClick={handleClick}>Checkout</button>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   const { login, cart } = state;
//   return {
//     login,
//     cart,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getCart: (id) => {
//       dispatch(loadCart(id));
//     },
//     updateItem: (cart, product, amount) => {
//       dispatch(updateCart(cart, product, amount));
//     },
//     removeItem: (cart, productId) => {
//       dispatch(removeItem(cart, productId));
//     },
//     purchase: (date, items, orderId, userId) => {
//       dispatch(purchaseItems(date, items, orderId, userId));
//     },
//   };
// };
export default Cart;
