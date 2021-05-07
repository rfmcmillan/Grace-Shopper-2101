import React from 'react';
import { connect } from 'react-redux';
import { loadOrders, updateOrder } from '../../store/orders';
import { Link } from 'react-router-dom';
import OrderFilter from './OrderFilter';
import { loadFilteredOrders, filterByStatus } from '../../store/orders';

class ManageOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.byStatus = this.byStatus.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    const { load } = this.props;
    load();
  }

  byStatus(ev) {
    const { load, filterByStatus } = this.props;
    const status = ev.target.value;
    load();
    filterByStatus(status);
  }

  reset() {
    this.props.load();
  }

  render() {
    const {
      orders,
      login: { admin },
    } = this.props;
    return admin ? (
      <div id="manage-orders">
        <OrderFilter filterByStatus={this.byStatus} reset={this.reset} />
        <h2>Manage Orders</h2>
        <ul>
          {orders.map((order, idx) => {
            const {
              id,
              complete,
              date_of_purchase,
              purchased_items,
              userId,
              status,
              products,
            } = order;
            return (
              <div key={idx} className="order-manage">
                <li key="order-id">Order ID: {id}</li>
                <li key="user-id">User ID: {userId}</li>
                <li key="complete">Complete: {complete ? 'Yes' : 'No'}</li>
                <li key="date">Date: {date_of_purchase}</li>
                <li key="status">Status: {status}</li>
                <Link to={`/manage-orders/${order.id}`}>Edit</Link>
              </div>
            );
          })}
        </ul>
      </div>
    ) : (
      <div>
        <h4>You are not authorized to view this page.</h4>
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
    update: (order) => {
      return dispatch(updateOrder(order));
    },
    filterByStatus: (status) => {
      return dispatch(filterByStatus(status));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrders);
