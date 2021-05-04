import axios from 'axios';
import React from 'react';

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {},
      users: [],
      currentUser: {},
    };
    this.onChange = this.onChange.bind(this);
    this.destroy = this.destroy.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }

  async componentDidMount() {
    await this.exchangeToken();
    await this.loadUsers();
    this.loadUser();
  }

  componentDidUpdate() {}

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
  async loadUser() {
    const { users } = this.state;
    const { id } = this.props.match.params;
    console.log(id);
    console.log(users);
    const currentUser = users.find((user) => {
      console.log(user.id);
      return user.id === id || {};
    });
    console.log('currentUser:', currentUser);
    // const response = await axios.get(`/api/users/:id`);
    // const user = response.data;
    // console.log('user:', user);
    // this.setState({ user });
  }

  async destroy(user) {
    const response = await axios.delete(`/api/users/${user.id}`);
    const usersResponse = await axios.get('/api/users');
    const users = usersResponse.data;
    this.setState({ users });
  }

  render() {
    const { auth, users } = this.state;
    const { destroy, onChange } = this;
    // const { email, password, firstName, lastName } = this.state.user;

    if (!auth.admin) {
      return (
        <div>
          <h4>You are not authorized to view this page.</h4>
        </div>
      );
    }
    return (
      <div>
        <h2>Edit User</h2>
        <form>
          {/* <label>Email Address:</label>
          <input name="email" value={email} onChange={onChange} />
          <br /> */}
          {/* <label>Password:</label>
          <input name="password" value={password} onChange={onChange} />
          <br />
          <label>First Name:</label>
          <input name="firstName" value={firstName} onChange={onChange} />
          <br />
          <label>Last Name:</label>
          <input name="lastName" value={lastName} onChange={onChange} />
          <br /> */}
        </form>
      </div>
    );
  }
}

export default EditUser;
