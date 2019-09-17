import { combineReducers } from 'redux';

import auth from './auth.reducer';
import global from './global.reducer';

export default combineReducers({
  auth,
  global,
});
