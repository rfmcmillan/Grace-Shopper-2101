/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadProducts, setMax } from '../store/products/products';
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
    this.handleQueryChange = this.handleQueryChange.bind(this);
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
    const max = event.target.value;
    this.props.setMax(max);
  }

  handleQueryChange(event) {
    const name = event.target.value;
    const { history } = this.props;
    history.push(`products/c/${name}`);
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
          handleQueryChange={this.handleQueryChange}
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
  const { cart, user, categories, countries } = state;
  const { max } = state.products;
  let { products } = state.products;
  if (!products) {
    return "There's no products now...";
  }
  products = products.filter((product) => product.price < max);
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

    setMax: (max) => {
      dispatch(setMax(max));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
