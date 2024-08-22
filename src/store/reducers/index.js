import {combineReducers} from '@reduxjs/toolkit';
import accountState from './account';
import settingState from './setting';

const rootReducer = combineReducers({
  account: accountState,
  settings: settingState,
});

export default rootReducer;
