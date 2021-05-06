/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  loadProducts,
  filterByCategory,
  filterByCountry,
  filterByPrice,
  filterByRating,
} from '../store/products/products';
import { addToCart } from '../store/cart';

import Filter from './Filters';

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { loadAllProducts } = this.props;
    loadAllProducts();
    console.log(this.props);
  }

  handleClick(product) {
    let cart = null;
    if (this.props.login.cart) {
      cart = this.props.login.cart;
    }
    this.props.addItem(product, cart);
  }

  render() {
    const { products } = this.props;
    return (
      <div id="main">
        <Filter />
        <h1>Products</h1>
        <div id="allProducts">
          {products.map((product) => {
            return (
              <div key={product.id} className="product">
                <Link to={`/products/${product.id}`}>
                  <h3>{`${product.title}`}</h3>
                </Link>
                <h4>
                  {product.country.name}
                  <i className={`em ${product.country.flag}`} />
                </h4>

                <img
                  className="allProductImage"
                  src={product.imageUrl}
                  alt={product.description}
                />

                <button
                  onClick={() => {
                    this.handleClick(product);
                  }}
                >
                  Quick Add
                </button>
              </div>
            );
          })}
        </div>
        {/* <productCreate history={history} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { products, login } = state;
  if (!products) {
    return "There's no products now...";
  }
  return {
    products,
    login,
  };
};

const mapDispatchToProps = (dispatch) => {
  // const { history } = ownProps;
  return {
    loadAllProducts: () => {
      dispatch(loadProducts());
    },
    addItem: (productId, cart) => {
      dispatch(addToCart(productId, cart));
    },

    filterByRating: (rating) => dispatch(filterByRating(rating)),
    filterByCountry: (country) => {
      dispatch(filterByCountry(country));
    },
    filterByPrice: (max) => {
      dispatch(filterByPrice(max));
    },
    filterByCategory: (category) => {
      dispatch(filterByCategory(category));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
