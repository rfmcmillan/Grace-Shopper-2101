import axios from 'axios';
import React from 'react';

class ManageUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: {},
      users: [],
    };
    this.onChange = this.onChange.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  componentDidMount() {
    this.exchangeToken();
    this.loadUsers();
  }

  componentDidUpdate() {
    this.loadUsers();
  }

  onChange(event) {
    const change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  async exchangeToken() {
    const token = window.localStorage.getItem('token');
    console.log('token:', token);
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
  async loadUsers() {
    const response = await axios.get('/api/users');
    const users = response.data;
    this.setState({ users });
  }

  async destroy(user) {
    const response = await axios.delete(`/api/users/${user.id}`);
    const usersResponse = await axios.get('/api/users');
    const users = usersResponse.data;
    console.log(users);
    console.log('this:', this);
    this.setState({ users });
    console.log(this.state.users);
  }

  render() {
    const { auth, users } = this.state;
    console.log(auth);
    const { destroy } = this;
    const { onChange } = this;
    if (!auth.admin) {
      return (
        <div>
          <h4>You are not authorized to view this page.</h4>
        </div>
      );
    }
    return (
      <div>
        <h2>Manage Users</h2>
        <div>
          {users.map((user) => {
            return (
              <div>
                <ul id="user">
                  <li>First Name: {user.firstName}</li>
                  <li>Last Name: {user.lastName}</li>
                  <li>email: {user.email}</li>
                </ul>
                <button
                  type="button"
                  id="mainButtons"
                  onClick={() => destroy(user)}
                >
                  X
                </button>
                <button type="button" id="mainButtons">
                  Edit
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ManageUsers;
