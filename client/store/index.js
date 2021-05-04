// Create Store Here
import axios from 'axios';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { usersReducer } from './usersStore';
import productReducer from './products/products';
import singleProductReducer from './products/singleProduct';
import countriesReducer from './countries';

const initialState = {
  products: [],
  users: [],
  singleProduct: {},
  loading: true,
};

//Loading check
const LOADED = 'LOADED';

const loaded = (state = true, action) => {
  if (action.type === LOADED) {
    state = { ...state, loading: false };
    return state;
  }
};

// enter different reducers into combineReducers({}) as a key-value pair.
// e.g. 'products: productsReducer'
export const reducer = combineReducers({
  users: usersReducer,
  products: productReducer,
  currProduct: singleProductReducer,
  countries: countriesReducer,
});

//Create Store

const store = createStore(reducer, applyMiddleware(thunk, logger));
export default store;
