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
    this.exchangeToken = this.exchangeToken.bind(this);
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

  onChange(event) {
    const change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  async login(event, email, password) {
    event.preventDefault();
    const { token } = (await axios.post('/api/auth', { email, password })).data;
    window.localStorage.setItem('token', token);
    this.exchangeToken();
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
          <button onClick={logout}>Log Out</button>
        </div>
      );
    }
  }
}

//next step is to connect this to the redux store and create action creator and thunks for auth
export default connect(null, null)(LogIn);
