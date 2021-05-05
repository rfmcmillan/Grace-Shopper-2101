import axios from 'axios';
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
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  //  when the component mounts, it checks local storage for a token and if there is one, then it sets the local state's auth property to the user object. You can then use the 'auth object' in an if/else statement inside the render method to change the appearance of the component based on whether or not the auth property has a user or not (in other words, whether a user is logged in or not)
  componentDidMount() {
    this.exchangeToken();
  }

  onChange(event) {
    const change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  // this exchangeToken function can be copied over to other components to set the state's 'auth' property to the logged-in user object
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
    const {
      auth, error, email, password,
    } = this.state;
    const { login, onChange, logout } = this;
    if (!auth.id) {
      return (
        <div>
          <h4>Log In:</h4>
          <form onSubmit={(event) => { return login(event, email, password); }}>
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
    return (
      <div>
        <h4>
          Welcome
          {auth.firstName ? `, ${auth.firstName}` : ''}
          ! You are now
          logged in!
        </h4>
        <button onClick={logout}>Log Out</button>
      </div>
    );
  }
}

export default connect(null, null)(LogIn);
