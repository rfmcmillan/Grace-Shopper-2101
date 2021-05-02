import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

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
const reducer = combineReducers({ users: usersReducer });

//Create Store
const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
//Export Thunks As Named Exports
export { loadUsers };
