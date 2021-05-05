import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { updateUser, loadUsers, resetPassword } from '../store/users';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
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
    const { load } = this.props;
    this.exchangeToken();
    this.props.load();
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
    const { auth, email, password } = this.state;
    const { login, onChange, logout } = this;
    const { reset } = this.props;
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
      if (!auth.passwordResetTriggered) {
        return (
          <div>
            <h4>
              Welcome{auth.firstName ? `, ${auth.firstName}` : ''}! You are now
              logged in!
            </h4>
            <button onClick={logout}>Log Out</button>
          </div>
        );
      } else {
        return (
          <div>
            <h4>
              Hi{auth.firstName ? `, ${auth.firstName}` : ''}! Please reset your
              password!
            </h4>
            <form
              onSubmit={() => {
                reset(auth, password);
              }}
            >
              <label>New Password</label>
              <input name="password" value={password} onChange={onChange} />
              <button>Update Password</button>
            </form>

            <button onClick={logout}>Log Out</button>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    update: (user) => {
      return dispatch(updateUser(user, history));
    },
    load: () => {
      return dispatch(loadUsers());
    },
    reset: (user, password) => {
      return dispatch(resetPassword(user, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
