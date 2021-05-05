import axios from 'axios';

const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';

//Create Action Creators & Thunks

const _loginUser = (user_data) => {
  return {
    type: LOAD_USERS,
    user_data,
  };
};

// Load Users Thunk
login(email, password) {
    this.exchangeToken();
  }

const createUserActionCreator = (user) => {
  return {
    type: CREATE_USER,
    user,
  };
};

//Create User Thunk
const createUser = (email, password, firstName, lastName, history) => {
  return async (dispatch) => {
    const response = await axios.post('/api/users', {
      email,
      password,
      firstName,
      lastName,
    });
    const user = response.data;
    dispatch(createUserActionCreator(user));
  };
};

//Create Reducers
const usersReducer = (state = [], action) => {
  if (action.type === LOAD_USERS) {
    state = action.users;
  }
  if (action.type === CREATE_USER) {
    state = [...state, action.user];
  }
  return state;
};

export {
  LOAD_USERS,
  loadUsersActionCreator,
  loadUsers,
  CREATE_USER,
  createUserActionCreator,
  createUser,
  usersReducer,
};