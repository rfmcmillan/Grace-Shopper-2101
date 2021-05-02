import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { deleteProduct, updateProduct } from '../store';
// import { Link } from 'react-router-dom';

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { product } = this.props;
    // console.log('Props in singleProduct.js', this.props);
    // const history = this.props.history;
    return product ? (
      <div key={product.id}>
        <h1>
          The Information for {product.title}
        </h1>
        {/* <p>
          Country Name:
          <Link to={`/countries/${country.id}`}>
          </Link>
        </p> */}
        <p>Brand: {product.brand}</p>
        <p>Description:{product.description}</p>
        <p>Price:{product.price}</p>
        <img src={product.imageUrl} />

        {/* <Link to={`/products/${product.id}/update`}>
          <button>Update</button>
        </Link> */}
        {/* <button
          onClick={() => {
            this.props.destroy(product, history);
          }}
        >
          Delete
        </button>
      </div>
    ) : (
      <h1>Product not found</h1>
    ); */}
  };
}

const mapStateToProps = (state, otherProps) => {
  const product = state.products.find((product) => product.id === otherProps.match.params.id * 1);
  return { product: product };
};
{/* const mapDispatchToProps = (dispatch, { history }) => {
  return {
    destroy: (product, history) => dispatch(deleteStudent(product, history)),
  };
}; */}

export default connect(mapStateToProps)(SingleProduct);
