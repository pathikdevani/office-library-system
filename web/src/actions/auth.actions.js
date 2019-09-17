import { SET_CURRENT_USER } from './types';

const setCurrentUserData = user => ({
  type: SET_CURRENT_USER,
  user,
});

const setCurrentUser = user => (dispatch) => {
  dispatch(setCurrentUserData(user));
};

export default {
  setCurrentUser,
};
