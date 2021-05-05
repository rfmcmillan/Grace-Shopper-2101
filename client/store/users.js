import axios from 'axios';

const LOAD_USERS = 'LOAD_USERS';
const CREATE_USER = 'CREATE_USER';
const UPDATE_USER = 'UPDATE_USER';
const DESTROY_USER = 'DESTROY_USER';

//Create Action Creators & Thunks

const loadUsersActionCreator = (users) => {
  return {
    type: LOAD_USERS,
    users,
  };
};

// Load Users Thunk
const loadUsers = () => {
  return async (dispatch) => {
    const response = await axios.get('api/users');
    const users = response.data;
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

//Update User Action Creator and Thunk
const updateUserActionCreator = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

const updateUser = (user, history) => {
  console.log('in updateUser thunk: user:', user);
  const { id, firstName, lastName, email, admin } = user;
  console.log('id:', id);
  return async (dispatch) => {
    const user = (
      await axios.put(`/api/users/${id}`, {
        firstName,
        lastName,
        email,
        admin,
      })
    ).data;
    dispatch(updateUserActionCreator(user));
  };
};

//Destroy User Action Creator and Thunk
const destroyUserActionCreator = (user) => {
  return {
    type: DESTROY_USER,
    user,
  };
};

const destroyUser = (user, history) => {
  return async (dispatch) => {
    await axios.delete(`api/users/${user.id}`);
    dispatch(destroyUserActionCreator(user));
    //history.push('/users');
  };
};

//Reducer
const usersReducer = (state = [], action) => {
  if (action.type === LOAD_USERS) {
    state = action.users;
  }
  if (action.type === CREATE_USER) {
    state = [...state, action.user];
  }
  if (action.type === DESTROY_USER) {
    state = state.filter((user) => {
      return user.id !== action.user.id;
    });
  }
  if (action.type === UPDATE_USER) {
    const otherUsers = state.filter((user) => {
      return user.id !== action.user.id;
    });
    state = [...otherUsers, action.user];
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
  destroyUserActionCreator,
  destroyUser,
  updateUserActionCreator,
  updateUser,
  usersReducer,
};
