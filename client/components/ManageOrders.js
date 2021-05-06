import React from 'react';
import { connect } from 'react-redux';
import { loadOrders } from '../store/orders';

class ManageOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);
    const { load, orders } = this.props;
    load();
  }

  render() {
    const { orders } = this.props;

    return (
      <div id="manage-orders">
        <h2>Manage Orders</h2>
        <ul>
          {orders.map((order, idx) => {
            const {
              id,
              complete,
              date_of_purchase,
              purchased_items,
              userId,
            } = order;
            return (
              <div key={idx} className="order-manage">
                <li>Order ID: {id}</li>
                <li>User ID: {userId}</li>
                <li>Complete: {complete.toString() ? 'Yes' : 'No'}</li>
                <li>Date: {date_of_purchase}</li>
                <li>Items: {purchased_items}</li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => {
      return dispatch(loadOrders());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrders);
