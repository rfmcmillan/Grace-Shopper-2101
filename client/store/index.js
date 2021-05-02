import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import usersReducer from './usersReducer';

//Create Action Creators & Thunks

//Load Users Action Creator

//Load Users Thunk

//Create Reducers

//enter different reducers into combineReducers({}) as a key-value pair. e.g.  'products: productsReducer'
const reducer = combineReducers({ users: usersReducer });

//Create Store
const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
