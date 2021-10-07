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
    productsTitle: {
      marginLeft: 15,
      fontSize: 24,
      fontWeight: 400,
    },
    country: {},
    icon: { color: theme.palette.primary.main },
    info: { marginTop: 10 },
    price: {
      color: theme.palette.primary.main,
    },
    category: {
      margin: theme.spacing(0.5),
    },
  });
  const classes = useStyles();

  const handleClick = (prod) => {
    let cart = null;
    if (login.cart) {
      cart = login.cart;
    }
    dispatch(addToCart(prod, cart));
  };

  return (
    <Paper key={product.id} className="product">
      <Grid container direction="column" alignItems="center">
        <img
          className="allProductImage"
          src={product.imageUrl}
          alt={product.description}
        />
      </Grid>
      <Grid
        className={classes.info}
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
    </Paper>
  );
};

export default ProductCard;
