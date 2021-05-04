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
    this.makeAdmin = this.makeAdmin.bind(this);
  }

  async componentDidMount() {
    console.log('component mounted');
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
    console.log('users are loaded');
  }

  async loadUser() {
    const { users } = this.state;

    const { id } = this.props.match.params;

    const currentUser = users.find((user) => {
      return user.id === (id || {});
    });
    this.setState({ currentUser });
  }

  async destroy(currentUser) {
    const response = await axios.delete(`/api/users/${user.id}`);
    const usersResponse = await axios.get('/api/users');
    const users = usersResponse.data;
    this.setState({ users });
  }

  async makeAdmin(currentUser) {
    console.log(this.state.currentUser);
    const { id } = this.state.currentUser;
    console.log(id);
    await axios.put(`api/users/${id}`, { admin: true });
  }

  render() {
    console.log('rendering...');
    const { auth, currentUser } = this.state;
    const { email, firstName, lastName, admin } = currentUser;
    const { makeAdmin } = this;
    console.log(admin);
    if (!auth.admin) {
      return (
        <div>
          <h4>You are not authorized to view this page.</h4>
        </div>
      );
    }
    return (
      <div id="edit-user">
        <h2>Edit User</h2>
        <ul>
          <li>Email: {email}</li>
          <li>First Name: {firstName}</li>
          <li>Last Name: {lastName}</li>
          <li>Admin: {admin ? 'Yes' : 'No'}</li>
        </ul>
        <button onClick={(currentUser) => makeAdmin(currentUser)}>
          {admin ? 'Remove Admin Status' : 'Make Admin'}
        </button>

        {/* <form>
          <label>Email Address:</label>
          <input name="email" value={email} onChange={onChange} />
          <br />
          <label>First Name:</label>
          <input name="firstName" value={firstName} onChange={onChange} />
          <br />
          <label>Last Name:</label>
          <input name="lastName" value={lastName} onChange={onChange} />
          <br />
        </form> */}
      </div>
    );
  }
}

export default EditUser;
