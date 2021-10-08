/* eslint-disable class-methods-use-this */
/* eslint-disable react/button-has-type */
import React, { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector, useDispatch } from 'react-redux';
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
import {
  ShoppingCart,
  AddCircleOutline,
  RemoveCircleOutline,
  HighlightOffOutlined,
} from '@material-ui/icons';
import { loadStripe } from '@stripe/stripe-js';
import {
  loadCart,
  updateCart,
  removeItem,
  purchaseItems,
} from '../../store/cart';
import classNames from 'classnames';

const stripePromise = loadStripe(
  'pk_test_51InvgGCzEJe0jWa9qmsLFyAIhV0dMwJeA59eCJtu4leBd9h8TcouHwM2OG1c691aHwIWcSebkNRCKTboOy2frM0p001MLpy1xK'
);

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const login = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const { location } = props;
  const theme = useTheme();

  const useStyles = makeStyles({
    form: { marginLeft: 10 },
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
    textField: { width: 70 },
    total: { marginTop: 5 },
  });

  const classes = useStyles();
  useEffect(() => {
    if (login.cart) {
      dispatch(loadCart(login.cart));
    }

    // const query = new URLSearchParams(location.search);
    // if (query.get('success')) {
    //   const items = cart.map((e) => {
    //     return { amount: e.amount, item: e };
    //   });

    //   const orderId = login.cart || null;
    //   const userId = login.id || null;
    //   const date = new Date().toISOString().split('T')[0];

    //   dispatch(purchaseItems(date, items, orderId, userId));
    // }
    // if (query.get('canceled')) {
    //   window.alert(
    //     "Order canceled -- continue to shop around and checkout when you're ready."
    //   );
    // }
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
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await axios.post(
      'api/order/create-checkout-session',
      cart
    );
    const { data } = response;

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });
  };
  return (
    <Box className={classes.contain}>
      <Box sx={{ display: 'flex', margin: '15px 0px 10px 15px' }}>
        <ShoppingCart color="primary" />
        <Typography color="primary">
          {cart.length} {cart.length > 1 ? 'items' : 'item'}
        </Typography>
      </Box>
      <List>
        {cart.map((product) => {
          return (
            <ListItem className={classes.listItem} key={product.id}>
              <Grid container direction="row">
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
                <Grid item container xs={5} justifyContent="flex-end">
                  <Grid item>
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
      <Button onClick={handleClick}>Checkout</Button>
    </Box>
  );
};

export default Cart;
