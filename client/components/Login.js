/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable react/sort-comp */
import React from 'react';
import { connect } from 'react-redux';
import { updateUser, loadUsers, resetPassword } from '../store/users';
import { loginUser } from '../store/loginstate';
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

  onChange(event) {
    const change = {};
    change[event.target.name] = event.target.value;

    this.setState(change);
  }

  handleLogin(event, email, password) {
    event.preventDefault();
    this.props.login(email, password);
    window.location.hash = '/products';
  }

  render() {
    const { email, password } = this.state;
    const { onChange } = this;
    return (
      <div>
        <h4>Log In:</h4>
        <form
          onSubmit={(event) => {
            return this.handleLogin(event, email, password);
          }}
        >
          <label>Email Address:</label>
          <input name="email" value={email} onChange={onChange} />
          <br />
          <label>Password:</label>
          <input name="password" value={password} onChange={onChange} />
          <br />
          <button>Log In</button>
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
