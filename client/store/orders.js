import axios from 'axios';

const LOAD_ORDERS = 'LOAD_ORDERS';
const CREATE_ORDER = 'CREATE_ORDER';

//Create Action Creators & Thunks

const loadOrdersActionCreator = (orders) => {
  return {
    type: LOAD_ORDERS,
    orders,
  };
};

// Load Orders Thunk
const loadOrders = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/order');
    const orders = response.data;
    console.log(orders);
    dispatch(loadOrdersActionCreator(orders));
  };
};

// const createOrderActionCreator = (order) => {
//   return {
//     type: CREATE_ORDER,
//     user,
//   };
// };

// //Create User Thunk
// const createUser = (email, password, firstName, lastName, history) => {
//   return async (dispatch) => {
//     const response = await axios.post('/api/users', {
//       email,
//       password,
//       firstName,
//       lastName,
//     });
//     const user = response.data;
//     dispatch(createUserActionCreator(user));
//   };
// };

const ordersReducer = (state = [], action) => {
  if (action.type === LOAD_ORDERS) {
    state = action.orders;
  }
  return state;
};
export default ordersReducer;
export { loadOrdersActionCreator, loadOrders };
