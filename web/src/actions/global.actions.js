import { SET_GLOBAL_LOADING, SET_GLOBAL_SPLASH } from './types';

const setGlobalLoading = loading => (dispatch) => {
  dispatch({
    type: SET_GLOBAL_LOADING,
    loading,
  });
};

const setGlobalSplash = splash => (dispatch) => {
  dispatch({
    type: SET_GLOBAL_SPLASH,
    splash,
  });
};

export default {
  setGlobalLoading,
  setGlobalSplash,
};
