// /* eslint-disable*/

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { addToCart } from '../../store/cart';
import {
  Button,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Box,
  MenuItem,
  Grid,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import ProductTabs from './ProductTabs';
import Reviews from './Reviews';
import NewReview from './NewReviewForm';
import { getSingleProduct } from '../../store/products/singleProduct';

const SingleProduct = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.currProduct);
  const login = useSelector((state) => state.login);
  const [addedToCart, setAddedToCart] = useState(false);
  const countryName = product.country ? product.country.name : ' ';
  const reviews = product.reviews || [];
  const { match } = props;

  const theme = useTheme();
  const useStyles = makeStyles({
    addToCart: { marginTop: 20 },
    button: { marginLeft: 10 },
    contain: { margin: 50, width: '90vw' },
    description: {
      fontWeight: 400,
      marginLeft: 5,
      color: theme.palette.text.primary,
    },
    numReviews: { marginLeft: 5, color: theme.palette.text.primary },
    price: {
      fontSize: 24,
      fontWeight: 400,
      margin: '10px 0px 2px 0px',
      color: theme.palette.primary.main,
    },
    stars: { marginLeft: 5 },
    stock: {
      marginLeft: 2,
      color: theme.palette.text.primary,
    },
    text: {
      color: theme.palette.text.primary,
    },
    title: {
      fontSize: 24,
      fontWeight: 600,
      marginBottom: 10,
      color: theme.palette.text.primary,
    },
    value: {
      fontWeight: 600,
      marginLeft: 5,
      color: theme.palette.text.primary,
    },
  });
  const classes = useStyles();

  useEffect(() => {
    const { id } = match.params;
    dispatch(getSingleProduct(id));
  }, []);

  useEffect(() => {
    const { id } = match.params;
    dispatch(getSingleProduct(id));
  }, [match.params.id]);

  const updateReviews = () => {
    const { id } = match.params;
    dispatch(getSingleProduct(id));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const amount = parseInt(evt.target.amount.value);
    let cart = null;
    if (login.cart) {
      cart = login.cart;
    }
    dispatch(addToCart(product, cart, amount));
    setAddedToCart(true);
  };

  const checkIfReviewed = (userId, reviews) => {
    return reviews.some((review) => review.userId === userId);
  };

  const ratings = product.reviews
    ? product.reviews.map((review) => review.rating)
    : [];

  const sumRatings = ratings.length
    ? ratings.reduce((sum, rating) => {
        return sum + rating;
      })
    : 0;

  const averageRating = sumRatings / ratings.length;
  return product ? (
    <div className={classes.contain}>
      <Grid container direction="column" alignItems="center">
        <Grid item container alignItems="center" justifyContent="space-around">
          <Grid item>
            <img
              id="single-product-img"
              src={product.imageUrl}
              alt={product.description}
            />
          </Grid>
          <Grid>
            <div id="singleProduct" key={product.id}>
              <Typography className={classes.title} variant="h1">
                {product.title}
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <Typography className={classes.text}>Brand:</Typography>
                <Typography className={classes.value}>
                  {product.brand}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography className={classes.text}>Country:</Typography>
                <Typography className={classes.value}>
                  {' '}
                  {countryName}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography className={classes.text}>Rated:</Typography>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', marginLeft: 5 }}
                >
                  <StarRatings
                    rating={averageRating ? averageRating : 0}
                    starRatedColor="#FFBF00"
                    numberOfStars={5}
                    starDimension="18px"
                    starSpacing="0px"
                    name="rating"
                  />
                  <Typography
                    className={classes.numReviews}
                    variant="body2"
                  >{`(${reviews.length})`}</Typography>
                </Box>
              </Box>

              <Typography variant="h2" className={classes.price}>
                ${product.price}
              </Typography>
              <Typography className={classes.stock} variant="body2">
                Stock Available
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid
                  className={classes.addToCart}
                  container
                  alignItems="center"
                >
                  <Grid item>
                    <FormControl variant="outlined">
                      <InputLabel id="add-to-cart">Qty</InputLabel>
                      <Select
                        labelId="add-to-cart"
                        label="Add to Cart"
                        devaultValue="0"
                        id="add-to-cart"
                        name="amount"
                        data-qa="add-to-cart"
                      >
                        <MenuItem value="0" data-qa="0">
                          --
                        </MenuItem>
                        <MenuItem value="1" data-qa="1">
                          1
                        </MenuItem>
                        <MenuItem value="2" data-qa="2">
                          2
                        </MenuItem>
                        <MenuItem value="3" data-qa="3">
                          3
                        </MenuItem>
                        <MenuItem value="4" data-qa="4">
                          4
                        </MenuItem>
                        <MenuItem value="5" data-qa="5">
                          5
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Button
                      className={classes.button}
                      variant="contained"
                      type="submit"
                    >
                      Add to Cart
                    </Button>
                  </Grid>
                </Grid>
              </form>

              {/* {addedToCart ? (
                <Link to="/cart">
                  <button>Continue To Checkout</button>
                </Link>
              ) : (
                <div></div>
              )}
              <Typography>Reviews</Typography>

              {login.id ? (
                checkIfReviewed(login.id, reviews) ? (
                  <div>Thanks! You've reviewed this already! </div>
                ) : (
                  <NewReview
                    productId={product.id}
                    userId={login.id}
                    updateReviews={updateReviews}
                    checkIfReviewed={checkIfReviewed}
                    reviews={reviews}
                  />
                )
              ) : (
                <div>Please log in to leave a review</div>
              )}
              <Reviews reviews={reviews} /> */}
            </div>
          </Grid>
        </Grid>
      </Grid>
      <ProductTabs product={product} match={match} />
    </div>
  ) : (
    <div>
      (<h1>Product not found</h1>
      );
    </div>
  );
};

export default SingleProduct;
