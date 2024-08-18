import React from 'react';
import {register} from 'react-native-bundle-splitter';

export const SCREEN_NAME = {
  HOME: 'HomeScreen',
  LOGIN: 'LoginScreen',
};

export const SCREEN_STACK = {
  WELLCOMESTACK: 'WelcomeStack',
};

export const REGISTER = {
  HomeScreen: register({
    loader: () => import('@screens/home'),
    extract: SCREEN_NAME.HOME,
    name: SCREEN_NAME.HOME,
  }),
  LoginScreen: register({
    loader: () => import('@screens/login'),
    extract: SCREEN_NAME.LOGIN,
    name: SCREEN_NAME.LOGIN,
  }),
};
