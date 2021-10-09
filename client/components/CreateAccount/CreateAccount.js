import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createUser } from '../../store/users';
import { Button, TextField } from '@material-ui/core';

const CreateAccount = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    error: '',
  });
  const { email, password, firstName, lastName } = state;

  const onChange = (ev) => {
    const change = {};
    change[ev.target.name] = ev.target.value;
    setState(change);
  };

  const onSave = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(createUser(email, password, firstName, lastName));
      window.location.hash = 'login';
    } catch (error) {
      setState({ error: error.response.data.error });
    }
  };

  return (
    <div id="login-contain">
      <h4 id="add-user">Create Account:</h4>
      <form id="create-form" onSubmit={onSave}>
        <TextField
          required
          label="Email Address"
          variant="outlined"
          name="email"
          value={email}
          onChange={onChange}
        />

        <TextField
          required
          label="Password"
          name="password"
          variant="outlined"
          value={password}
          onChange={onChange}
        />

        <TextField
          label="First Name"
          name="firstName"
          variant="outlined"
          value={firstName}
          onChange={onChange}
        />

        <TextField
          label="Last Name"
          name="lastName"
          variant="outlined"
          value={lastName}
          onChange={onChange}
        />

        <Button id="create-button" variant="contained" onClick={onSave}>
          Create Account
        </Button>
      </form>
    </div>
  );
};

// const mapDispatchToProps = (dispatch, { history }) => {
//   return {
//     create: (email, password, firstName, lastName) =>
//       dispatch(createUser(email, password, firstName, lastName, history)),
//   };
// };

// export default connect(null, mapDispatchToProps)(CreateAccount);
export default CreateAccount;
