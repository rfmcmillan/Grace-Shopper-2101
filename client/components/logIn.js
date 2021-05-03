import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

const russel = { email: 'russel@snacker.com', password: 'russel_pw' };

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
    this.login = this.login.bind(this);
  }

  onChange(event) {
    const change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  async login(event, email, password) {
    event.preventDefault();
    const response = await axios.post('/api/auth', { email, password });
    const { token } = response.data;
  }

  render() {
    const { auth, error, email, password } = this.state;
    const { login, onChange } = this;
    if (!auth.id) {
      return (
        <div>
          <h4>Log In:</h4>
          <form onSubmit={(event) => login(event, email, password)}>
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
    } else {
      return (
        <div>
          <h4>Welcome! You are now logged in!</h4>
          <form onSubmit={(event) => login(event, email, password)}>
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
