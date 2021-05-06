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
    return (
      <div>
        <h2>Manage Orders</h2>
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
