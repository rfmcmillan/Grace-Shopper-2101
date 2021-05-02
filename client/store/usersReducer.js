import axios from 'axios';

const LOAD_USERS = 'LOAD_USERS';

//Create Action Creators & Thunks

//Load Users Action Creator
const loadUsersAC = (users) => {
  return {
    type: LOAD_USERS,
    users,
  };
};

//Load Users Thunk
const loadUsers = () => {
  return async (dispatch) => {
    const users = await axios.get('api/users');
    dispatch(loadUsersAC(users));
  };
};

//Create Reducers
const usersReducer = (state = [], action) => {
  if (action.type === LOAD_USERS) {
    state = action.users;
  }
  return state;
};

//Export Thunks As Named Exports
export default usersReducer;
export { loadUsers };
