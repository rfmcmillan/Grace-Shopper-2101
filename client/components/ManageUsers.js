import axios from 'axios';
import React from 'react';

class ManageUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: {},
    };
    this.onChange = this.onChange.bind(this);
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

  render() {
    const { auth } = this.state;
    const { onChange } = this;
    if (!auth.admin) {
      return (
        <div>
          <h4>You are not authorized to view this page.</h4>
        </div>
      );
    } else {
      return (
        <div>
          <h4>Manage Users</h4>
        </div>
      );
    }
  }
}

export default ManageUsers;
