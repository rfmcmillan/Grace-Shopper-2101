import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadProducts } from '../store/products/products';
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
    console.log('here');
  }

  render() {
    const { products } = this.props;
    const { history } = this.props;
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
                {/* <button
                  onClick={() => {
                    this.props.destroy(product, history);
                  }}
                >
                  Delete
                </button> */}
              </div>
            );
          })}
        </div>
        {/* <productCreate history={history} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state, otherProps) => {
  const { products } = state;
  if (!products) {
    return "There's no products now...";
  }
  return {
    products,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // const { history } = ownProps;
  return {
    loadAllProducts: () => {
      dispatch(loadProducts());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
