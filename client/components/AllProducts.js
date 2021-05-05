/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadProducts } from '../store/products/products';
import { loadCountries } from '../store/countries';
import { loadCategories } from '../store/categories';
import { addToCart } from '../store/cart';
import Filter from './Filter';

// import ProductCreate from './ProductCreate';
// import { deleteProduct } from '../store';

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { loadAllProducts, loadCategories, loadCountries } = this.props;
    loadAllProducts();
    loadCountries();
    loadCategories();
  }

  handleClick(product) {
    let cart = null;
    if (this.props.user) {
      cart = this.props.user.cart;
    }
    this.props.addItem(product, cart);
  }

  handleChange(event) {
    console.log(event.target);
  }

  render() {
    const { products, countries, categories } = this.props;
    return (
      <div id="main">
        <h1>Products</h1>
        <Filter
          countries={countries}
          categories={categories}
          handleChange={this.handleChange}
        />
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
                  Add To Cart
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
  const { products, cart, user, categories, countries } = state;
  if (!products) {
    return "There's no products now...";
  }
  return {
    products,
    cart,
    user,
    categories,
    countries,
  };
};

const mapDispatchToProps = (dispatch) => {
  // const { history } = ownProps;
  return {
    loadAllProducts: () => {
      dispatch(loadProducts());
    },
    loadCategories: () => {
      dispatch(loadCategories());
    },
    loadCountries: () => {
      dispatch(loadCountries());
    },
    addItem: (productId, cart) => {
      dispatch(addToCart(productId, cart));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
