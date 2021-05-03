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
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    const token = window.localStorage.getItem('token', token);
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

  onChange(event) {
    const change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  async login(event, email, password) {
    event.preventDefault();
    let response = await axios.post('/api/auth', { email, password });
    const { token } = response.data;
    window.localStorage.setItem('token', token);
    response = await axios.get('/api/auth', {
      headers: {
        authorization: token,
      },
    });
    const user = response.data;
    this.setState({ auth: user });
  }

  logout() {
    window.localStorage.removeItem('token');
    this.setState({ auth: {} });
  }

  render() {
    const { auth, error, email, password } = this.state;
    const { login, onChange, logout } = this;
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
          <h4>
            Welcome{auth.firstName ? `, ${auth.firstName}` : ''}! You are now
            logged in!
          </h4>
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
            <button onClick={logout}>Log Out</button>
          </form>
        </div>
      );
    }
  }
}

export default connect(null, null)(LogIn);
