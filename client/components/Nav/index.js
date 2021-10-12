/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  AppBar,
  Toolbar,
  Grid,
  Icon,
  Badge,
  Drawer,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { AccountCircle, ShoppingCart } from '@material-ui/icons';
import { logoutUser } from '../../store/loginstate';
import { resetCart } from '../../store/cart';
import NavButton from './NavButton';
import Cart from '../Cart';

const Nav = () => {
  const home = window.location.hash === 'disabled';
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const login = useSelector((state) => state.login);
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const useStyles = makeStyles({
    appBar: {
      backgroundColor: 'white',
      boxShadow: '0px 4px 16px 0px rgb(43 52 69 / 10%)',
      color: theme.palette.text.primary,
      position: 'fixed',
      top: 0,
    },
    logo: {
      fontFamily: 'Fredoka One',
      fontSize: '30',
      width: 420,
      fontWeight: 700,
    },
    button: {
      color: theme.palette.text.primary,
      fontSize: 'medium',
      fontWeight: 200,
      fontFamily: theme.typography.fontFamily,
    },
  });

  const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsOpen(open);
  };
  console.log('login:', login);
  return home ? (
    <div></div>
  ) : login.admin ? (
    <AppBar className={classes.appBar} position="static">
      <Toolbar>
        <NavButton
          className={classes.logo}
          component={Link}
          to="/"
          disableFocusRipple={true}
          disableRipple={true}
        >
          Global Snacker
        </NavButton>
        <Grid container justifyContent="flex-end">
          <NavButton
            className={classes.button}
            component={Link}
            to="/products"
            disableFocusRipple={true}
            disableRipple={true}
          >
            Products
          </NavButton>
          <NavButton
            className={classes.button}
            component={Link}
            to="/manage-products"
            disableFocusRipple={true}
            disableRipple={true}
          >
            Manage Products
          </NavButton>
          <NavButton
            className={classes.button}
            component={Link}
            to="/manage-orders"
            disableFocusRipple={true}
            disableRipple={true}
          >
            Manage Orders
          </NavButton>
          <NavButton
            className={classes.button}
            component={Link}
            to="/manage-users"
            disableFocusRipple={true}
            disableRipple={true}
          >
            Manage Users
          </NavButton>
          <NavButton
            className={classes.button}
            component={Link}
            to="/manage-countries"
            disableFocusRipple={true}
            disableRipple={true}
          >
            Manage Countries
          </NavButton>
          <Button className={classes.button} onClick={toggleDrawer(true)}>
            {' '}
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCart />
            </Badge>
          </Button>
          <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
            <Cart />
          </Drawer>

          {login.email ? (
            <NavButton
              className={classes.button}
              component={Link}
              to="/view-account"
              disableFocusRipple={true}
              disableRipple={true}
            >
              <AccountCircle />
            </NavButton>
          ) : (
            <NavButton
              className={classes.button}
              component={Link}
              to="/login"
              disableFocusRipple={true}
              disableRipple={true}
            >
              Log In
            </NavButton>
          )}
          {login.email ? (
            <Button
              className={classes.button}
              onClick={() => {
                dispatch(logoutUser());
                dispatch(resetCart());
              }}
            >
              Logout
            </Button>
          ) : (
            ''
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  ) : (
    <AppBar className={classes.appBar} position="static">
      <Toolbar>
        <NavButton
          className={classes.logo}
          component={Link}
          to="/"
          disableFocusRipple={true}
          disableRipple={true}
        >
          Global Snacker
        </NavButton>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <NavButton
              className={classes.button}
              component={Link}
              to="/products"
              disableFocusRipple={true}
              disableRipple={true}
            >
              Products
            </NavButton>
          </Grid>
          <Grid item>
            <Button onClick={toggleDrawer(true)}>
              {' '}
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCart />
              </Badge>
            </Button>
          </Grid>
          <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
            <Cart />
          </Drawer>
          {login.email ? (
            <Link to="/view-account">
              <span id="logged">
                {`
          logged in as:
          ${login.email}`}
              </span>
            </Link>
          ) : (
            <Grid item>
              <NavButton
                className={classes.button}
                component={Link}
                to="/login"
                disableFocusRipple={true}
                disableRipple={true}
              >
                Log In
              </NavButton>
            </Grid>
          )}
        </Grid>
        {login.email ? (
          <Button
            className={classes.button}
            onClick={() => {
              dispatch(logoutUser());
              dispatch(resetCart());
            }}
          >
            logout
          </Button>
        ) : (
          ''
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
