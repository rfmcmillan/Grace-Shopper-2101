import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import ProductCreate from './ProductCreate';
// import { deleteProduct } from '../store';

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { products } = this.props;
    console.log('!!! See the products in AllProducts:', products);
    const history = this.props.history;
    return (
      <div id="main">
        <h1>Products</h1>
        {products.map((product) => {
          return (
            <div key={product.id} className="product">
              <Link to={`/products/${product.id}`}>
                <h3>{`${product.title}`}</h3>
                <img src={product.imageUrl} />
                {/* <button
                  onClick={() => {
                    this.props.destroy(product, history);
                  }}
                >
                  Delete
                </button> */}
              </Link>
            </div>
          );
        })}
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
    countries: state.countries,
  };
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//   const history = ownProps.history;
//   return {
//     destroy: (product, history) => dispatch(deleteProduct(product, history)),
//   };
// };
export default connect(mapStateToProps)(AllProducts);
