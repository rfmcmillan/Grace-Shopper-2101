import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navBar">
    <Link to="/">The Global Snacker</Link>
    <Link to="/countries"> Countries</Link>
    <input type="text" placeholder="search" />
    <Link to="/login">Log in</Link>
    <Link to="/cart">Cart</Link>
  </div>
);

export default Nav;
