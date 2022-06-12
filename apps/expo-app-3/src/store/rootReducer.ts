import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './ducks/user';
import appStateReducer from './ducks/appState';

const rootReducer = combineReducers({
  appState: appStateReducer,
  user: userReducer,
});

export default rootReducer;
