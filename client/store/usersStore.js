import axios from 'axios';

const LOAD_USERS = 'LOAD_USERS';
const CREATE_USER = 'CREATE_USER';

//Create Action Creators & Thunks

const loadUsersActionCreator = (users) => {
  return {
    type: LOAD_USERS,
    users,
  };
};

//Load Users Thunk
const loadUsers = () => {
  return async (dispatch) => {
    const users = await axios.get('api/users');
    dispatch(loadUsersActionCreator(users));
  };
};

const createUserActionCreator = (user) => {
  return {
    type: CREATE_USER,
    user,
  };
};

//Create User Thunk
const createUser = (email, password, firstName, lastName, history) => {
  return async (dispatch) => {
    const user = await axios.post('api/users', {
      email,
      password,
      firstName,
      lastName,
    });
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
