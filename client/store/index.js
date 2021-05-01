import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const LOAD_USERS = 'LOAD_USERS';

//Create Action Creators & Thunks

//Create Reducers

//enter different reducers into combineReducers({}) as a key-value pair. e.g.  'products: productsReducer'
const reducer = combineReducers({});

//Create Store
const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
//Export Thunks As Named Exports
export {};
