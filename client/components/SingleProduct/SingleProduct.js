/* eslint-disable*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSingleProduct } from '../../store/products/singleProduct';
import Reviews from './Reviews';
import NewReview from './NewReviewForm';
import axios from 'axios';
import { addToCart } from '../../store/cart';

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedToCart: false,
    };

    this.updateReviews = this.updateReviews.bind(this);
    this.checkIfReviewed = this.checkIfReviewed.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProduct(id);
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
    if (this.props.login.cart) {
      cart = this.props.login.cart;
    }

    //ADD AMOUNT
    this.props.addItem(product, cart);
    this.setState({ addedToCart: true });
  }

  checkIfReviewed(userId, reviews) {
    return reviews.some((review) => review.userId === userId);
  }

  render() {
    const { product, login } = this.props;
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
        {this.state.addedToCart ? (
          <Link to="/cart">
            <button>Continue To Checkout</button>
          </Link>
        ) : (
          <div></div>
        )}
        <h1>Reviews</h1>

<<<<<<< HEAD
<<<<<<< HEAD
        {login.email ? (
=======
        {login.id ? (
>>>>>>> 9908e68f3f003679458ae5051c3970ad2e50055a
=======

        {login.id ? (
>>>>>>> d4ba80cdacb5144592f62b38a13bcf6f28bec95e
          this.checkIfReviewed(login.id, reviews) ? (
            <div>Thanks! You've reviewed this already! </div>
          ) : (
            <NewReview
              productId={product.id}
              userId={login.id}
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
  console.log(state.login);
  return {
    product: state.currProduct,
    reviews: state.currProduct.reviews,
    user: state.user,
    login: state.login,
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
