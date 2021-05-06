import axios from 'axios';

const LOAD_ORDERS = 'LOAD_ORDERS';
const UPDATE_ORDER = 'UPDATE_ORDER';

//Create Action Creators & Thunks

const loadOrdersActionCreator = (orders) => {
  return {
    type: LOAD_ORDERS,
    orders,
  };
};

//  Load Orders Thunk
const loadOrders = () => {
  return async (dispatch) => {
    const response = await axios.get('/api/order/orders');
    const orders = response.data;
    dispatch(loadOrdersActionCreator(orders));
  };
};

// Update Order Action Creator and Thunk
const updateOrderActionCreator = (order) => {
  return {
    type: UPDATE_ORDER,
    order,
  };
};

const updateOrder = (order) => {
  const {
    id,
    complete,
    date_of_purchase,
    purchased_items,
    userId,
    status,
  } = order;
  return async (dispatch) => {
    const orderToUpdate = (
      await axios.put(`/api/order/orders/${id}`, {
        complete,
        date_of_purchase,
        purchased_items,
        userId,
        status,
      })
    ).data;
    dispatch(updateOrderActionCreator(orderToUpdate));
  };
};

const ordersReducer = (state = [], action) => {
  if (action.type === LOAD_ORDERS) {
    state = action.orders;
  }
  if (action.type === UPDATE_ORDER) {
    const orders = state.map((order) => {
      if (order.id === action.order.id) {
        return action.order;
      }
      return order;
    });
    state = orders;
  }
  return state;
};
export default ordersReducer;
export { loadOrdersActionCreator, loadOrders, updateOrder };
