import axios from 'axios';
import React from 'react';
import CreateProduct from './CreateProduct';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadStudents } from '../../store/products/products.js';

class ManageProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: {},
      products: [],
    };
  }

  componentDidMount() {
    this.exchangeToken();
    this.loadProducts();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevState);
  //   if (prevState.products !== this.state.products) {
  //     this.loadProducts();
  //   }
  // }

  async exchangeToken() {
    const token = window.localStorage.getItem('token');

    if (token) {
      const response = await axios.get('/api/auth', {
        headers: {
          authorization: token,
        },
      });
      const user = response.data;

      this.setState({ auth: user });
    }
  }

  async loadProducts() {
    const response = await axios.get('/api/products');
    const products = response.data;
    this.setState({ products });
  }

  render() {
    const { auth, products } = this.state;
    const {} = this;
    if (!auth.admin) {
      return (
        <div>
          <h4>You are not authorized to view this page.</h4>
        </div>
      );
    }
    return (
      <div id="manage-products">
        <h2>Manage Products</h2>
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
              countryId,
            } = product;

            return (
              <div key={idx}>
                <img src={imageUrl} alt="snack" width="100" />
                <ul id="product-manage">
                  <li>Title: {title}</li>
                  <li>Brand: {brand}</li>
                  <li>Description: {description}</li>
                  <li>Price: {price}</li>
                  <li>Inventory:{inventory}</li>
                </ul>
                <Link to={`/manage-products/${product.id}`}>Edit</Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    load: () => dispatch(loadProducts()),
  };
};

export default connect(null, null)(ManageProducts);
