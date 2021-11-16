import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginReducer from './loginstate';
import cartReducer from './cart';
import { usersReducer } from './users';
import productReducer from './products/products';
import singleProductReducer from './products/singleProduct';
import countriesReducer from './countries';
import ordersReducer from './orders';
import categoriesReducer from './categories';
import purchaseReducer from './purchases';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'login'],
};

const initialState = {
  login: [],
  products: [],
  users: [],
  singleProduct: {},
  loading: true,
  categories: [],
};

const LOADED = 'LOADED';

const loaded = (state = true, action) => {
  if (action.type === LOADED) {
    state = { ...state, loading: false };
    return state;
  }
};

export const reducer = combineReducers({
  cart: cartReducer,
  users: usersReducer,
  products: productReducer,
  currProduct: singleProductReducer,
  login: loginReducer,
  countries: countriesReducer,
  orders: ordersReducer,
  categories: categoriesReducer,
  purchases: purchaseReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, applyMiddleware(thunk, logger));
const persistor = persistStore(store);

export default { store, persistor };
