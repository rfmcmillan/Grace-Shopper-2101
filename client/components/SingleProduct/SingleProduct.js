/* eslint-disable*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleProduct } from '../../store/products/singleProduct';
import Reviews from './Reviews';
import NewReview from './NewReviewForm';
import axios from 'axios';
import { addToCart } from '../../store/cart';

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      purchased: false,
    };

    this.updateReviews = this.updateReviews.bind(this);
    this.checkIfReviewed = this.checkIfReviewed.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProduct(id);
    this.exchangeToken();
    console.log('HERERE', this.props.user);
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
  }

  updateReviews() {
    const { id } = this.props.match.params;
    this.props.getProduct(id);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const amount = evt.target.amount.value;
    const product = this.props.product;
    let cart = null;
    if (this.props.user) {
      cart = this.props.user.cart;
    }
    console.log('HERERE', this.props.user);

    //ADD AMOUNT
    this.props.addItem(product, cart);
  }

  checkIfReviewed(userId, reviews) {
    return reviews.some((review) => review.userId === userId);
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
        <form onSubmit={this.handleSubmit}>
          <select name="amount">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button type="submit">Add to Cart</button>
        </form>
        <h1>Reviews</h1>

        {auth.id ? (
          this.checkIfReviewed(auth.id, reviews) ? (
            <div>Thanks! You've reviewed this already! </div>
          ) : (
            <NewReview
              productId={product.id}
              userId={auth.id}
              updateReviews={this.updateReviews}
              checkIfReviewed={this.checkIfReviewed}
              reviews={reviews}
            />
          )
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
  return {
    product: state.currProduct,
    reviews: state.currProduct.reviews,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    getProduct: (id) => {
      dispatch(getSingleProduct(id));
    },
    addItem: (productId, cart) => {
      dispatch(addToCart(productId, cart));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
