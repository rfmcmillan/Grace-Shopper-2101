// Create Store Here
import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { usersReducer } from './usersStore';
import { productReducer } from './products/products';
import singleProductReducer from './products/singleProduct';

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

//enter different reducers into combineReducers({}) as a key-value pair. e.g.  'products: productsReducer'
const reducer = combineReducers({
  users: usersReducer,
  products: productReducer,
  currProduct: singleProductReducer,
});

//Create Store
const store = createStore(reducer, applyMiddleware(thunk, logger));
export default store;
//Export Thunks As Named Exports
export { loaded, reducer };
