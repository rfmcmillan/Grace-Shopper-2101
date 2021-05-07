/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable react/sort-comp */
import React from 'react';
import { connect } from 'react-redux';
import { updateUser, loadUsers, resetPassword } from '../store/users';
import { loginUser } from '../store/loginstate';

import { TextField, Button, ThemeProvider } from '@material-ui/core';

// fix login issues
class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  //  when the component mounts, it checks local storage for a token and if there is one, then it sets the local state's auth property to the user object. You can then use the 'auth object' in an if/else statement inside the render method to change the appearance of the component based on whether or not the auth property has a user or not (in other words, whether a user is logged in or not)
  componentDidMount() {
    //this.exchangeToken();
  }

  onChange(event) {
    const change = {};
    change[event.target.name] = event.target.value;

    this.setState(change);
  }

  handleLogin(event, email, password) {
    event.preventDefault();
    this.props.login(email, password);
    // this.exchangeToken();
    window.location.hash = '/products';
  }

  render() {
    const { email, password } = this.state;
    const { onChange } = this;
    return (
      <div>
        <h4>Log In:</h4>
        <form>
          {/* <label>Email Address:</label>
          <input name="email" value={email} onChange={onChange} /> */}
          <TextField
            label="Email Address"
            variant="outlined"
            name="email"
            value={email}
            onChange={onChange}
          />
          <br />
          {/* <label>Password:</label>
          <input name="password" value={password} onChange={onChange} /> */}
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            value={password}
            onChange={onChange}
          />
          <br />
          <Button
            onClick={(event) => {
              return this.handleLogin(event, email, password);
            }}
            variant="contained"
            color="primary"
          >
            Log In
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => {
      dispatch(loginUser(email, password));
    },
  };
};

export default connect(null, mapDispatchToProps)(LogIn);
