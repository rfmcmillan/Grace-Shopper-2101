/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, AppBar, Toolbar, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { logoutUser } from '../../store/loginstate';
import { resetCart } from '../../store/cart';
import NavButton from './NavButton';

const Nav = () => {
  const home = window.location.hash === 'disabled';
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const login = useSelector((state) => state.login);

  const theme = useTheme();

  const useStyles = makeStyles({
    logo: {
      fontFamily: 'Courier Prime',
      fontSize: '30',
      width: 420,
    },
    button: {
      color: theme.palette.text.primary,
      fontSize: 'medium',
      fontFamily: theme.typography.fontFamily,
    },
  });

  const classes = useStyles();

  return home ? (
    <div></div>
  ) : login.admin ? (
    <AppBar position="static">
      <NavButton
        className={classes.logo}
        component={Link}
        to="/"
        disableFocusRipple={true}
        disableRipple={true}
      >
        The Global Snacker
      </NavButton>

      <NavButton
        className={classes.button}
        component={Link}
        to="/products"
        disableFocusRipple={true}
        disableRipple={true}
      >
        Products
      </NavButton>

      <Link to="/products"> Products</Link>
      <Link to="/manage-products">Manage Products</Link>
      <Link to="/manage-orders">Manage Orders</Link>
      <Link to="/manage-users">Manage Users</Link>
      <Link to="/manage-countries"> Manage Countries</Link>
      <NavButton
        component={Link}
        to="/cart"
        disableFocusRipple={true}
        disableRipple={true}
      >
        Cart({cart.length})
      </NavButton>

      {login.email ? (
        <Link to="/view-account">
          <span id="logged">
            {`
             logged in as:
             ${login.email}`}
          </span>
        </Link>
      ) : (
        <NavButton
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
          id="quick-add"
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
    </AppBar>
  ) : (
    <AppBar position="static">
      <Toolbar>
        <NavButton
          className={classes.logo}
          component={Link}
          to="/"
          disableFocusRipple={true}
          disableRipple={true}
        >
          The Global Snacker
        </NavButton>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <NavButton
              component={Link}
              to="/products"
              disableFocusRipple={true}
              disableRipple={true}
            >
              Products
            </NavButton>
          </Grid>
          <Grid item>
            <NavButton
              component={Link}
              to="/cart"
              disableFocusRipple={true}
              disableRipple={true}
            >
              Cart({cart.length})
            </NavButton>
          </Grid>
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
            id="quick-add"
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
