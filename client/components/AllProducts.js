/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadProducts } from '../store/products/products';
import { addToCart } from '../store/cart';
// import ProductCreate from './ProductCreate';
// import { deleteProduct } from '../store';

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { loadAllProducts } = this.props;
    loadAllProducts();
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
  const { products, login } = state;
  if (!products) {
    return "There's no products now...";
  }
  return {
    products, login,
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
