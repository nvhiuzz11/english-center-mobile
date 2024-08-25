import React from 'react';
import {register} from 'react-native-bundle-splitter';

export const SCREEN_NAME = {
  LOGIN: 'LoginScreen',
  HOME: 'HomeScreen',
  CLASS_STUDENT: 'ClassStudentScreen',
  CHILD: 'ChildScreen',
  PARENT: 'ParentScreen',
  FEE: 'FeeScreen',
  WAGE: 'WageScreen',
  CLASS_TEACHER: 'ClassTeacherScreen',
  SETTING: 'SettingScreen',
  BOTTOM_TAB: 'BottomTab',
};

export const SCREEN_STACK = {
  WELLCOMESTACK: 'WelcomeStack',
  MAINSTACK: 'MainStack',
};

export const TAB_NAME = {
  HOME_TAB: 'HomeTab',
  CLASS_STUDENT_TAB: 'ClassStudentTab',
  CHILD_TAB: 'ChildTab',
  PARENT_TAB: 'ParentTab',
  FEE_TAB: 'FeeTab',
  WAGE_TAB: 'WageTab',
  CLASS_TEACHER_TAB: 'ClassTeacherTab',
  SETTING_TAB: 'SettingTab',
};

export const REGISTER = {
  LoginScreen: register({
    loader: () => import('@screens/login'),
    extract: SCREEN_NAME.LOGIN,
    name: SCREEN_NAME.LOGIN,
  }),
  HomeScreen: register({
    loader: () => import('@screens/home'),
    extract: SCREEN_NAME.HOME,
    name: SCREEN_NAME.HOME,
  }),
  ClassStudentScreen: register({
    loader: () => import('@screens/classStudent'),
    extract: SCREEN_NAME.CLASS_STUDENT,
    name: SCREEN_NAME.CLASS_STUDENT,
  }),
  ChildScreen: register({
    loader: () => import('@screens/child'),
    extract: SCREEN_NAME.CHILD,
    name: SCREEN_NAME.CHILD,
  }),
  ParentScreen: register({
    loader: () => import('@screens/parent'),
    extract: SCREEN_NAME.PARENT,
    name: SCREEN_NAME.PARENT,
  }),
  FeeScreen: register({
    loader: () => import('@screens/fee'),
    extract: SCREEN_NAME.FEE,
    name: SCREEN_NAME.FEE,
  }),
  WageScreen: register({
    loader: () => import('@screens/wage'),
    extract: SCREEN_NAME.WAGE,
    name: SCREEN_NAME.WAGE,
  }),
  ClassTeacherScreen: register({
    loader: () => import('@screens/classTeacher'),
    extract: SCREEN_NAME.CLASS_TEACHER,
    name: SCREEN_NAME.CLASS_TEACHER,
  }),
  SettingScreen: register({
    loader: () => import('@screens/setting'),
    extract: SCREEN_NAME.SETTING,
    name: SCREEN_NAME.SETTING,
  }),
};
