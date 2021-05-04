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
  }

  componentDidMount() {
    this.exchangeToken();
    this.loadUsers();
  }

  onChange(event) {
    const change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
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
  async loadUsers() {
    const response = await axios.get('/api/users');
    const users = response.data;
    this.setState({ users });
  }

  render() {
    const { auth, users } = this.state;
    console.log('users:', users);
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
              <ul id="user">
                <li>First Name: {user.firstName}</li>
                <li>Last Name: {user.lastName}</li>
                <li>email: {user.email}</li>
              </ul>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ManageUsers;
