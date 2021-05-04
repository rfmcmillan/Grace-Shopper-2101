/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';

const LOAD_CART = 'LOAD_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const UPDATE_AMOUNT = 'UPDATE_AMOUNT';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_CART: {
      return [...state, action.cart];
    }
    case ADD_TO_CART: {
      const key = state.find((e) => { return e.id === action.product.id; });
      if (key) {
        key.amount++;
        return [...state];
      }
      return [...state, { ...action.product, amount: 1 }];
    }
    case UPDATE_AMOUNT: {
      const key = state.find((e) => { return e.id === action.update.product; });
      key.amount = action.update.amount;
      return [...state];
    }
    case REMOVE_FROM_CART: {
      return [...state, action.cart];
    }
    default: {
      return state;
    }
  }
};

const _loadCart = (cart) => {
  return { type: LOAD_CART, cart };
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
const _addToCart = (product) => {
  return { type: ADD_TO_CART, product };
};

const addToCart = (product, cart = null) => {
  return async (dispatch) => {
    try {
      if (cart) {
        await axios.post('/api/order/addToCart', (cart, [product.id, 1]));
      }
      dispatch(_addToCart(product));
    } catch (err) {
      console.log(err);
    }
  };
};

const _updateCart = (update) => {
  return { type: UPDATE_AMOUNT, update };
};

const updateCart = (orderId, product, amount) => {
  return async (dispatch) => {
    try {
      if (orderId) {
        await axios.post('/api/order/updateCart', (orderId, product, amount));
      }
      dispatch(_updateCart({ product, amount }));
    } catch (err) {
      console.log(err);
    }
  };
};

export { loadCart, addToCart, updateCart };
export default cartReducer;
