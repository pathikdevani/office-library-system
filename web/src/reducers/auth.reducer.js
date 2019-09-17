import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
  authenticated: false,
  user: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        authenticated: !!action.user,
        user: action.user,
      };
    default:
      return state;
  }
};
