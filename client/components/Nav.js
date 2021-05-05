/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.exchangeToken();
  }

  logout() {
    window.localStorage.removeItem('token');
    this.setState({ auth: {} });
  }

  async exchangeToken() {
    const token = window.localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('/api/auth', {
          headers: {
            authorization: token,
          },
        });
        const user = response.data;
        this.setState({ user });
      } catch (err) {
        console.log(err);
      }
    }
  }

  render() {
    const home = window.location.hash === '#/';
    return home ? ((<div> </div>)) : (
      (
        <div className="navBar">
          <Link to="/">The Global Snacker</Link>
          <Link to="/products"> Products</Link>
          <Link to="/countries"> Countries</Link>
          <input type="text" placeholder="search" />
          {this.state.user ? (
            <div>
              <h5>
                logged in as:
                {this.state.user.email}
              </h5>
              <button onClick={this.logout}>logout</button>
            </div>
          )
            : <Link to="/login">Log in</Link>}
          <Link to="/cart">Cart</Link>
        </div>
      )
    );
  }
}
export default Nav;
