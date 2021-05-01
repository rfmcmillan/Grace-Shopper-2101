// Create Store Here
import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

//Create Action Creators & Thunks

//Create Reducers

//enter different reducers into combineReducers({}) as a key-value pair. e.g.  'products: productsReducer'
const reducer = combineReducers({});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
//Export Thunks As Named Exports
export {};
