/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import axios from 'axios';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
    };
  }

  componentDidMount() {
    this.exchangeToken();
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

  render() {
    const { auth } = this.state;

    if (!auth.id) {
      const home = window.location.hash === '#/';
      return home ? (
        <div> </div>
      ) : (
        <div className="navBar">
          <Link to="/">The Global Snacker</Link>
          <Link to="/products"> Products</Link>
          <Link to="/countries"> Countries</Link>
          <input type="text" placeholder="search" />
          <Link to="/login">Log in</Link>
          <Link to="/cart">Cart</Link>
        </div>
      );
    } else {
      const home = window.location.hash === '#/';
      return home ? (
        <div> </div>
      ) : (
        <div className="navBar">
          <Link to="/">The Global Snacker</Link>
          <Link to="/products"> Products</Link>
          <Link to="/countries"> Countries</Link>
          <input type="text" placeholder="search" />
          <Link to="/login">Logged in as {auth.firstName}</Link>
          <Link to="/manage-products">Manage Products</Link>
          <Link to="/manage-users">Manage Users</Link>
          <Link to="/cart">Cart</Link>
        </div>
      );
    }
  }
}
export default Nav;
=======
import { connect } from 'react-redux';
import { logoutUser } from '../store/loginstate';
import { resetCart } from '../store/cart';

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const home = window.location.hash === 'disabledfornow';
    return home ? ((<div> </div>)) : (
      (
        <div className="navBar">
          <Link to="/">The Global Snacker</Link>
          <Link to="/products"> Products</Link>
          <input type="text" placeholder="search" />
          {this.props.login.email ? (
            <div>
              <h5 id="logged">
                logged in as:
                {this.props.login.email}
              </h5>
              <button onClick={() => {
                this.props.logOut();
                this.props.clearCart();
              }}
              >
                logout
              </button>
            </div>
          )
            : <Link to="/login">Log in</Link>}
          <Link to="/cart">
            Cart(
            {this.props.cart.length}
            )
          </Link>
        </div>
      )
    );
  }
}
const mapStateToProps = (state) => {
  const { login, cart } = state;
  return { login, cart };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => {
      dispatch(logoutUser());
    },
    clearCart: () => {
      dispatch(resetCart());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
>>>>>>> main
