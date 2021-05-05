import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../store/users';

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
    } catch (error) {
      this.setState({ error: error.response.data.error });
    }
  }

  render() {
    const { email, password, firstName, lastName, error } = this.state;
    const { onChange, onSave } = this;

    return (
      <div>
        <h4 id="add-user">Create Account:</h4>
        <form onSubmit={onSave}>
          <label>Email Address:</label>
          <input name="email" value={email} onChange={onChange} />
          <br />
          <label>Password:</label>
          <input name="password" value={password} onChange={onChange} />
          <br />
          <label>First Name:</label>
          <input name="firstName" value={firstName} onChange={onChange} />
          <br />
          <label>Last Name:</label>
          <input name="lastName" value={lastName} onChange={onChange} />
          <br />
          <button>Create Account</button>
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
