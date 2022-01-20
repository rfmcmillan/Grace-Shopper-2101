/* eslint-disable class-methods-use-this */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  Typography,
  Box,
  List,
  ListItem,
  Button,
  TextField,
  Grid,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { ShoppingCart, HighlightOffOutlined } from '@material-ui/icons';
import { loadStripe } from '@stripe/stripe-js';
import { loadCart, updateCart, removeItem } from '../../store/cart';

const stripePromise = loadStripe(
  'pk_test_51InvgGCzEJe0jWa9qmsLFyAIhV0dMwJeA59eCJtu4leBd9h8TcouHwM2OG1c691aHwIWcSebkNRCKTboOy2frM0p001MLpy1xK'
);

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const { numberOfCartItems } = props;
  const theme = useTheme();

  const useStyles = makeStyles({
    checkout: { marginLeft: 8 },
    contain: { minWidth: 300 },
    form: { marginLeft: 10, marginTop: 18 },
    image: { margin: '0px 10px 0px 10px' },
    info: {},
    link: {
      fontFamily: theme.typography.fontFamily,
      textDecoration: 'none',
      fontSize: 16,
      color: theme.palette.text.primary,
      marginBottom: 7,
    },
    listItem: { border: '1px solid #F1F1F1', padding: '10', minWidth: 650 },
    none: { padding: 10 },
    textField: { width: 70 },
    total: { marginTop: 5 },
  });

  const classes = useStyles();

  useEffect(() => {
    if (login.cart) {
      dispatch(loadCart(login.cart));
    }
  }, []);

  const handleRemove = (id) => {
    let orderId = null;
    if (login.cart) {
      orderId = login.cart;
    }
    dispatch(removeItem(orderId, id));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { name } = evt.target.querySelector('input');
    let orderId = null;
    if (login.cart) {
      orderId = login.cart;
    }
    dispatch(updateCart(orderId, name, this.state[name]));
    window.location.reload();
  };

  const handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  const handleClick = async (event) => {
    const stripe = await stripePromise;
    const response = await axios.post(
      'api/order/create-checkout-session',
      cart
    );
    const { data } = response;
    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });
  };

  return (
    <Box className={classes.contain}>
      <Box sx={{ display: 'flex', margin: '15px 0px 10px 15px' }}>
        <ShoppingCart color="text" />
        <Typography color="text" data-qa="item-count">
          {numberOfCartItems} {cart.length === 1 ? 'item' : 'items'}
        </Typography>
      </Box>
      <List>
        {cart.map((product) => {
          return (
            <ListItem className={classes.listItem} key={product.id}>
              <Grid container direction="row" alignItems="center">
                <Grid
                  className={classes.info}
                  item
                  container
                  alignItems="center"
                  direction="row"
                  xs={7}
                >
                  <Grid item>
                    <Typography>{product.amount}</Typography>
                  </Grid>
                  <Grid item>
                    <img
                      className={classes.image}
                      src={product.imageUrl}
                      alt={product.description}
                      width="75"
                      height="75"
                    />
                  </Grid>
                  <Grid item>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Link
                        className={classes.link}
                        to={`/products/${product.id}`}
                      >
                        {`${product.title}`}
                      </Link>
                      <Typography variant="caption">{`$${product.price} x ${product.amount}`}</Typography>
                      <Typography
                        className={classes.total}
                        color="secondary"
                      >{`$${product.price * product.amount}`}</Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={5}
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Grid item alignItems="center">
                    <form className={classes.form} onSubmit={handleSubmit}>
                      <TextField
                        className={classes.textField}
                        name={`${product.id}`}
                        type="number"
                        min="1"
                        defaultValue={null}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                      />
                      <Button type="submit">Update</Button>
                    </form>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={() => {
                        return handleRemove(product.id);
                      }}
                    >
                      <HighlightOffOutlined />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </ListItem>
          );
        })}
      </List>
      {cart.length ? (
        <Button
          className={classes.checkout}
          onClick={handleClick}
          data-qa="checkout"
        >
          Checkout
        </Button>
      ) : (
        <Typography className={classes.none}>
          There aren't any items in your shopping cart
        </Typography>
      )}
    </Box>
  );
};

export default Cart;
