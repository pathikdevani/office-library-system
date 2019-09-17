import update from 'immutability-helper';

import { SET_GLOBAL_LOADING, SET_GLOBAL_SPLASH } from '../actions/types';

const initialState = {
  loading: false,
  splash: true,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_GLOBAL_LOADING:
      return update(state, { loading: { $set: action.loading } });
    case SET_GLOBAL_SPLASH:
      return update(state, { splash: { $set: action.splash } });
    default:
      return state;
  }
};
