import React from 'react';
import { Link } from 'react-router-dom';
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
  }
}
export default Nav;
