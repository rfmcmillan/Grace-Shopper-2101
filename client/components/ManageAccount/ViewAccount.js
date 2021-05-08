import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadOrders, updateOrder } from '../../store/orders';
import { loadPurchases } from '../../store/purchases';

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
    const login = this.props;
    if (!login.admin) {
      return (
        <div>
          <h4>You are not authorized to view this page.</h4>
        </div>
      );
    }
    return (
      <div id="manage-products">
        {/* <h2>Manage Products</h2>
        <CreateProduct />
        <div>
          {products.map((product, idx) => {
            const {
              title,
              brand,
              description,
              price,
              inventory,
              imageUrl,
              country,
            } = product;
            let { categories } = product || [];
            categories = categories
              ? categories.map((category) => category.name)
              : [];
            return (
              <div key={idx} className="product-manage">
                <img src={imageUrl} alt="snack" width="100" />
                <ul id="product-manage">
                  <li>Title: {title}</li>
                  <li>Brand: {brand}</li>
                  <li>Description: {description}</li>
                  <li>Price: {price}</li>
                  <li>Inventory: {inventory}</li>
                  <li>Country:{country ? country.name : ''}</li>
                  <li>Categories: {categories.join(', ')}</li>
                </ul>
                <Link to={`/manage-products/${product.id}`}>Edit</Link>
              </div>
            );
          })}
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    purchases: state.purchases,
    login: state.login,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    loadPurchases: (id) => dispatch(loadPurchases(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAccount);
