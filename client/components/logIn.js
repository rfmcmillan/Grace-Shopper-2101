import React from 'react';
import { connect } from 'react-redux';

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: {},
      error: '',
      email: '',
      password: '',
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
    const { auth, error, email, password } = this.state;
    const { onChange, onSave } = this;
    if (!auth.id) {
      return (
        <div>
          <h4 id="add-user">Log In:</h4>
          <form onSubmit={onSave}>
            <h5 className="error">
              {!!error &&
                JSON.stringify(
                  error.errors.map((error) => {
                    return error.message;
                  }),
                  null
                )}
            </h5>
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
}

export default connect(null, null)(LogIn);
