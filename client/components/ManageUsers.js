import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

class ManageUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: {},
      users: [],
    };
    this.destroy = this.destroy.bind(this);
    this.makeAdmin = this.makeAdmin.bind(this);
  }

  componentDidMount() {
    this.exchangeToken();
    this.loadUsers();
  }

  componentDidUpdate() {
    this.loadUsers();
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

  async destroy(user) {
    await axios.delete(`/api/users/${user.id}`);
    const usersResponse = await axios.get('/api/users');
    const users = usersResponse.data;
    this.setState({ users });
  }

  async makeAdmin(currentUser) {
    const { id } = currentUser;
    if (currentUser.admin === false) {
      await axios.put(`api/users/${id}`, { admin: true });
    } else {
      await axios.put(`api/users/${id}`, { admin: false });
    }
  }

  render() {
    const { auth, users } = this.state;
    const { destroy, makeAdmin } = this;
    if (!auth.admin) {
      return (
        <div>
          <h4>You are not authorized to view this page.</h4>
        </div>
      );
    }
    return (
      <div id="manage-users">
        <h2>Manage Users</h2>
        <div>
          {users.map((user, idx) => {
            return (
              <div key={idx}>
                <ul id="user">
                  <li key="first-name">First Name: {user.firstName}</li>
                  <li key="last-name">Last Name: {user.lastName}</li>
                  <li key="email">Email: {user.email}</li>
                  <li key="admin">Admin: {user.admin ? 'Yes' : 'No'}</li>
                </ul>
                <button
                  type="button"
                  id="mainButtons"
                  onClick={() => destroy(user)}
                >
                  Delete
                </button>
                <button type="button" onClick={() => makeAdmin(user)}>
                  {user.admin ? 'Remove Admin Status' : 'Make Admin'}
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
