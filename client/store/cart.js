/* eslint-disable no-underscore-dangle */
import axios from 'axios';

const LOAD_CART = 'LOAD_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const UPDATE_AMOUNT = 'UPDATE_AMOUNT';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_CART: {
      return [...state, { cart: [...action.cart] }];
    }
    case ADD_TO_CART: {
      return [...state, { cart: [...action.cart] }];
    }
    case UPDATE_AMOUNT: {
      return [...state, { cart: [...action.cart] }];
    }
    case REMOVE_FROM_CART: {
      return [...state, { cart: [...action.cart] }];
    }
    default: {
      return state;
    }
  }
};

const _loadCart = (cart) => {
  return { type: ADD_TO_CART, cart };
};

const loadCart = (id) => {
  return async (dispatch) => {
    try {
      if (id) {
        const { data } = await axios.get(`/api/order/cart/${id}`);
        dispatch(_loadCart(data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
const _addToCart = (cart) => {
  return { type: LOAD_CART, cart };
};

const addToCart = (product, orderId) => {
  return async (dispatch) => {
    try {
      if (orderId) {
        const { data } = await axios.get('/api/order/addToCart');
      }
      dispatch(_addToCart(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export { loadCart };
export default cartReducer;
