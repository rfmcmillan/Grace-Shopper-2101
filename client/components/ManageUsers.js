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
    const response = await axios.delete(`/api/users/${user.id}`);
    const usersResponse = await axios.get('/api/users');
    const users = usersResponse.data;
    this.setState({ users });
  }

  render() {
    const { auth, users } = this.state;
    const { destroy } = this;
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
                <Link to={`/manage-users/${user.id}`}>Edit User</Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ManageUsers;
