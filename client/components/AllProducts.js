/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  loadProducts,
  loadFilteredProducts,
  filterByCategory,
  filterByCountry,
  filterByPrice,
  filterByRating,
} from '../store/products/products';
import { addToCart } from '../store/cart';
import { loadCountries } from '../store/countries';
import { loadCategories } from '../store/categories';

import Filters from './Filters';

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.byCategory = this.byCategory.bind(this);
    this.byPrice = this.byPrice.bind(this);
    this.byCountry = this.byCountry.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    const {
      loadAllProducts,
      loadAllCountries,
      loadAllCategories,
      loadFilteredProducts,
    } = this.props;
    const { name } = this.props.match.params;
    loadAllCategories();
    loadAllCountries();
    if (name) {
      console.log(name);
      loadFilteredProducts(name);
    } else {
      loadAllProducts();
    }
  }

  handleClick(product) {
    let cart = null;
    if (this.props.login.cart) {
      cart = this.props.login.cart;
    }
    this.props.addItem(product, cart);
  }

  // byRating(ev) {}

  byCountry(ev) {
    const country = ev.target.value;
    this.props.filterByCountry(country);
    this.props.history.push(`/products/c/${country}`);
  }

  byCategory(ev) {
    const category = ev.target.value;
    this.props.filterByCategory(category);
  }

  byPrice(ev) {
    const max = ev.target.value;
    this.props.filterByPrice(max);
  }

  reset(ev) {
    const form = ev.target;
    ev.preventDefault();
    form.reset();
    this.props.loadAllProducts();
    this.props.history.push('/products');
  }

  render() {
    const { products, categories, countries } = this.props;
    const name = this.props.match.params.name || 'default';
    return (
      <div id="main">
        <Filters
          countries={countries}
          categories={categories}
          filterByCategory={this.byCategory}
          // filterByRating={this.byRating}
          filterByPrice={this.byPrice}
          filterByCountry={this.byCountry}
          reset={this.reset}
          name={name}
        />
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
                <h4>
                  {product.categories
                    .map((category) => {
                      return category.name;
                    })
                    .join(', ')}
                </h4>

                <h4>{product.price}</h4>

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
  const { products, login, countries, categories, cart, user } = state;
  if (!products) {
    return "There's no products now...";
  }
  return {
    countries,
    products,
    login,
    cart,
    user,
    categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  // const { history } = ownProps;
  return {
    loadAllProducts: () => {
      dispatch(loadProducts());
    },
    loadFilteredProducts: (country) => {
      dispatch(loadFilteredProducts(country));
    },

    loadAllCountries: () => {
      dispatch(loadCountries());
    },
    loadAllCategories: () => {
      dispatch(loadCategories());
    },
    addItem: (productId, cart) => {
      dispatch(addToCart(productId, cart));
    },

    filterByRating: (rating) => {
      return dispatch(filterByRating(rating));
    },
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
