import { combineReducers } from 'redux';

import { users } from './users.reducers';
import { alert } from './alert.reducers';
import { isLogged } from './isLogged.reducers';
const rootReducer = combineReducers({
  users,
  isLogged,
  alert
});

export default rootReducer;