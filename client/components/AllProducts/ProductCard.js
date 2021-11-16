import React, { Component, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Typography,
  Paper,
  Link,
  Chip,
  Grid,
  IconButton,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import StarRatings from 'react-star-ratings';
import { AddBoxIcon, AddBox, Add, AddBoxOutlined } from '@material-ui/icons';
import { addToCart } from '../../store/cart';

const ProductCard = (props) => {
  const { product } = props;
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const theme = useTheme();
  const useStyles = makeStyles({
    button: { padding: 0 },
    category: {
      margin: theme.spacing(0.2),
      color: theme.palette.text.primary,
    },
    contain: { height: '100%' },
    productsTitle: {
      marginLeft: 15,
      fontSize: 24,
      fontWeight: 400,
      color: theme.palette.text.primary,
    },
    country: {
      marginRight: theme.spacing(0.2),
      color: theme.palette.text.primary,
    },
    icon: {
      color: theme.palette.primary.main,
      width: 30,
      height: 30,
      fontWeight: 30,
    },
    info: { marginTop: 10 },
    price: {
      color: theme.palette.primary.main,
      fontSize: 14,
      fontWeight: 400,
      marginTop: 5,
    },
  });
  const classes = useStyles();

  const handleClick = (product) => {
    let cart = null;
    if (login.cart) {
      cart = login.cart;
    }
    dispatch(addToCart(product, cart, 1));
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
  return (
    <Paper elevation={4} key={product.id} className="product">
      <Grid
        className={classes.contain}
        container
        direction="column"
        justifyContent="space-between"
      >
        <Grid item container direction="column" alignItems="center">
          <img
            className="allProductImage"
            src={product.imageUrl}
            alt={product.description}
          />
        </Grid>
        <Grid
          className={classes.info}
          item
          container
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <Grid item>
            <Link
              className={classes.productsTitle}
              href={`/#/products/${product.id}`}
            >
              <Typography>{`${product.title}`}</Typography>
            </Link>
            <StarRatings
              rating={averageRating ? averageRating : 0}
              starRatedColor="#FFBF00"
              numberOfStars={5}
              starDimension="18px"
              starSpacing="0px"
              name="rating"
            />
            <Typography className={classes.price} variant="body1">
              ${product.price}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              className={classes.button}
              variant="outlined"
              onClick={() => {
                handleClick(product);
              }}
            >
              <Add className={classes.icon} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductCard;
