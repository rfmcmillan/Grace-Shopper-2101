// Create Store Here
import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

import {
  loadProducts,
  postProduct,
  deleteProduct,
  updateProduct,
  productReducer,
} from './product';

const initialState = {
  products: [],
  users: [],
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

const LOAD_USERS = 'LOAD_USERS';

//Create Action Creators & Thunks

//Load Users Action Creator
const loadUsersAC = (users) => {
  return {
    type: LOAD_USERS,
    users,
  };
};

//Load Users Thunk
const loadUsers = () => {
  return async (dispatch) => {
    const users = await axios.get('api/users');
    dispatch(loadUsersAC(users));
  };
};

//Create Reducers
const usersReducer = (state = [], action) => {
  if (action.type === LOAD_USERS) {
    state = action.users;
  }
  return state;
};

//enter different reducers into combineReducers({}) as a key-value pair. e.g.  'products: productsReducer'
const reducer = combineReducers({
  users: usersReducer,
  products: productReducer,
});

//Create Store
const store = createStore(reducer, applyMiddleware(thunk, logger));
export default store;
//Export Thunks As Named Exports
export {
  store,
  loadUsers,
  loaded,
  loadProducts,
  postProduct,
  deleteProduct,
  updateProduct,
};
