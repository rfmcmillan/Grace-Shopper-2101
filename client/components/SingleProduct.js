import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleProduct } from '../store/products/singleProduct';
import Reviews from './Reviews';
// import { Link } from 'react-router-dom';

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProduct(id);

    // get reviews as well
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id != this.props.match.params.id) {
      const { id } = this.props.match.params;
      console.log(id);
      this.props.getProduct(id);
    }
  }

  render() {
    const { product } = this.props;
    const countryName = product.country ? product.country.name : ' ';
    const flag = product.country ? product.country.flag : ' ';
    const reviews = product.reviews || [];
    // const history = this.props.history;
    return product ? (
      <div id="singleProduct" key={product.id}>
        <h1>The Information for {product.title}</h1>
        <p>Brand: {product.brand}</p>
        <p>Country: {countryName}</p>
        <i className={`em ${flag}`} />
        <p>Description:{[product.description]}</p>
        <p>Price:{product.price}</p>
        <img src={product.imageUrl} />
        <input type="number" placeholder="quantity" />
        <button>Add to Cart</button>

        <h1>Reviews</h1>
        <Reviews reviews={reviews} />
      </div>
    ) : (
      <div>
        (<h1>Product not found</h1>
        );
      </div>
    );
  }
}

const mapStateToProps = (state, otherProps) => {
  return { product: state.currProduct };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    getProduct: (id) => {
      dispatch(getSingleProduct(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
