import React, { Component, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Button, Typography, Paper, Link, Chip, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { addToCart } from '../../store/cart';

const ProductCard = (props) => {
  const { product } = props;
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const theme = useTheme();
  const useStyles = makeStyles({
    button: {},
    contain: { height: '100%' },
    productsTitle: {
      marginLeft: 15,
      fontSize: 24,
      fontWeight: 400,
    },
    country: { marginRight: theme.spacing(0.2) },
    icon: { color: theme.palette.primary.main },
    info: { marginTop: 10 },
    price: {
      color: theme.palette.primary.main,
    },
    category: {
      margin: theme.spacing(0.2),
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

  return (
    <Paper elevation={3} key={product.id} className="product">
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
            <Link href={`/#/products/${product.id}`}>
              <Typography>{`${product.title}`}</Typography>
            </Link>
            <Chip className={classes.country} label={product.country.name} />
            {product.categories.map((category) => {
              return (
                <Chip
                  className={classes.category}
                  label={category.name}
                  variant="outlined"
                />
              );
            })}

            <Typography className={classes.price} variant="body1">
              ${product.price}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="text"
              onClick={() => {
                handleClick(product);
              }}
            >
              <AddBoxIcon className={classes.icon} />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductCard;
