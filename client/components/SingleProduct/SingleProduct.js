/* eslint-disable*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleProduct } from '../../store/products/singleProduct';
import Reviews from './Reviews';
import NewReview from './NewReviewForm';
import axios from 'axios';

// import { Link } from 'react-router-dom';

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
    };

    this.updateReviews = this.updateReviews.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProduct(id);
    this.exchangeToken();
  }

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

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      const { id } = this.props.match.params;
      this.props.getProduct(id);
    }

    console.log('herees');
  }

  updateReviews() {
    const { id } = this.props.match.params;
    this.props.getProduct(id);
  }

  render() {
    const { product } = this.props;
    const { auth } = this.state;
    const countryName = product.country ? product.country.name : ' ';
    const flag = product.country ? product.country.flag : ' ';
    const reviews = product.reviews || [];
    // const history = this.props.history;
    return product ? (
      <div id="singleProduct" key={product.id}>
        <h1>{product.title}</h1>
        <p>
          Brand:
          {product.brand}
        </p>
        <p>
          Country:
          {countryName}
        </p>
        <i className={`em ${flag}`} />
        <p>
          Description:
          {[product.description]}
        </p>
        <p>
          Price:
          {product.price}
        </p>
        <img src={product.imageUrl} alt={product.description} />
        <select name="quanity">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
        <button type="submit">Add to Cart</button>

        <h1>Reviews</h1>

        {auth.id ? (
          <NewReview
            productId={product.id}
            userId={auth.id}
            updateReviews={this.updateReviews}
          />
        ) : (
          <div>Please log in to leave a review</div>
        )}
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
  return { product: state.currProduct, reviews: state.currProduct.reviews };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    getProduct: (id) => {
      dispatch(getSingleProduct(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
