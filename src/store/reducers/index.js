import {combineReducers} from '@reduxjs/toolkit';
import accountState from './account';
import settingState from './setting';
import appState from './app';

const rootReducer = combineReducers({
  account: accountState,
  settings: settingState,
  app: appState,
});

export default rootReducer;
