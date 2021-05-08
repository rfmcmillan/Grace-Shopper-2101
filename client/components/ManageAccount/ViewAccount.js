import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadOrders, updateOrder } from '../../store/orders';
import { loadPurchases } from '../../store/purchases';
import LogInPage from '../LogInPage';
import SinglePurchase from './SinglePurchase';

class ViewAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
    };
  }

  componentDidMount() {
    const { id } = this.props.login;
    if (id) {
      this.props.loadPurchases(id);
    }
  }

  render() {
    const { login } = this.props;
    if (!login.id) {
      return <LogInPage />;
    }
    const purchases = this.props.purchases.purchases || [];
    return (
      <div id="manage-account">
        <h2>Account Info</h2>
        <ul>
          <li>
            Name: {login.firstName} {login.lastNames}
          </li>
          <li>Email: {login.email}</li>
          <Link to="/update-account">Update Info</Link>
        </ul>
        {purchases.length ? (
          <div>
            <h2>Past Orders</h2>

            {purchases.map((purchase) => {
              return <SinglePurchase key={purchase.id} purchase={purchase} />;
            })}
          </div>
        ) : (
          <div>No Past Orders</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    purchases: state.purchases,
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    loadPurchases: (id) => dispatch(loadPurchases(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAccount);
