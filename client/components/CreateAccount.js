import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../store/users';
import { Button, TextField } from '@material-ui/core';

class CreateAccount extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      error: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  async onSave(ev) {
    ev.preventDefault();
    try {
      const { email, password, firstName, lastName } = this.state;
      await this.props.create(email, password, firstName, lastName);
      window.location.hash = 'login';
    } catch (error) {
      this.setState({ error: error.response.data.error });
    }
  }

  render() {
    const { email, password, firstName, lastName, error } = this.state;
    const { onChange, onSave } = this;

    return (
      <div id="login-contain">
        <h4 id="add-user">Create Account:</h4>
        <form id="create-form" onSubmit={onSave}>
          <TextField
            required
            label="Email Address"
            variant="outlined"
            name="email"
            value={email}
            onChange={onChange}
          />

          <TextField
            required
            label="Password"
            name="password"
            variant="outlined"
            value={password}
            onChange={onChange}
          />

          <TextField
            label="First Name"
            name="firstName"
            variant="outlined"
            value={firstName}
            onChange={onChange}
          />

          <TextField
            label="Last Name"
            name="lastName"
            variant="outlined"
            value={lastName}
            onChange={onChange}
          />

          <Button id="create-button" variant="contained" onClick={onSave}>
            Create Account
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    create: (email, password, firstName, lastName) =>
      dispatch(createUser(email, password, firstName, lastName, history)),
  };
};

export default connect(null, mapDispatchToProps)(CreateAccount);
