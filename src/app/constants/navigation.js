import {ChangeAccountlIcon} from '@assets/icons/changeAccountIcon';
import {LanguagelIcon} from '@assets/icons/languageIcon';
import {LogoutIcon} from '@assets/icons/logoutIcon';
import {NotificationlIcon} from '@assets/icons/notificationIcon';
import {PersonalIcon} from '@assets/icons/pesonalIcon';
import {ThemeIcon} from '@assets/icons/themeIcon';
import React from 'react';
import {register} from 'react-native-bundle-splitter';

export const SCREEN_NAME = {
  LOGIN: 'LoginScreen',
  REGISTER_PROFILE: 'RegisterProfileScreen',
  REGISTER_ACCOUNT: 'RegisterAccountScreen',
  SELECT_ROLE: 'SelectRoleScreen',
  HOME: 'HomeScreen',
  CLASS_STUDENT: 'ClassStudentScreen',
  CHILD: 'ChildScreen',
  PARENT: 'ParentScreen',
  FEE: 'FeeScreen',
  WAGE: 'WageScreen',
  CLASS_TEACHER: 'ClassTeacherScreen',
  SETTING: 'SettingScreen',
  BOTTOM_TAB: 'BottomTab',
  REGISTER_CLASS: 'ResgisterClassScreen',
  PERSONAL_INFORMATION: 'PersonalInformationScreen',
  DETAIL_STUDENT_CLASS: 'DetailStudentClassScreen',
  SCHEDULE: 'ScheduleScreen',
};

export const SCREEN_STACK = {
  WELLCOMESTACK: 'WelcomeStack',
  MAINSTACK: 'MainStack',
};

export const TAB_NAME = {
  HOME_TAB: 'HomeTab',
  CLASS_STUDENT_TAB: 'ClassStudentTab',
  SCHEDULE_TAB: 'ScheduleTab',
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
  SelectRoleScreen: register({
    loader: () => import('@screens/selectRole'),
    extract: SCREEN_NAME.SELECT_ROLE,
    name: SCREEN_NAME.SELECT_ROLE,
  }),
  RegisterProfileScreen: register({
    loader: () => import('@screens/registerProfile'),
    extract: SCREEN_NAME.REGISTER_PROFILE,
    name: SCREEN_NAME.REGISTER_PROFILE,
  }),
  RegisterAccountScreen: register({
    loader: () => import('@screens/registerAccount'),
    extract: SCREEN_NAME.REGISTER_ACCOUNT,
    name: SCREEN_NAME.REGISTER_ACCOUNT,
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
  ScheduleScreen: register({
    loader: () => import('@screens/schedule'),
    extract: SCREEN_NAME.SCHEDULE,
    name: SCREEN_NAME.SCHEDULE,
  }),
  SettingScreen: register({
    loader: () => import('@screens/setting'),
    extract: SCREEN_NAME.SETTING,
    name: SCREEN_NAME.SETTING,
  }),
  ResgisterClassScreen: register({
    loader: () => import('@screens/registerClass'),
    extract: SCREEN_NAME.REGISTER_CLASS,
    name: SCREEN_NAME.REGISTER_CLASS,
  }),
  PersonalInformationScreen: register({
    loader: () => import('@screens/personInfomation'),
    extract: SCREEN_NAME.PERSONAL_INFORMATION,
    name: SCREEN_NAME.PERSONAL_INFORMATION,
  }),
  DetailStudentClassScreen: register({
    loader: () => import('@screens/detailStudentClass'),
    extract: SCREEN_NAME.DETAIL_STUDENT_CLASS,
    name: SCREEN_NAME.DETAIL_STUDENT_CLASS,
  }),
};

export const ROUTES_STUDENT_CLASS = [
  {key: 'first', title: 'Active Class'},
  {key: 'second', title: 'Closed Class'},
];

export const LIST_SETTINGS = [
  {
    icon: <PersonalIcon />,
    label: 'Personal information',
    type: 'touchable',
    action: 'navigate',
    screen: SCREEN_NAME.PERSONAL_INFORMATION,
  },
  {
    icon: <LanguagelIcon />,
    label: 'Language',
    type: 'language',
  },
  {
    icon: <NotificationlIcon />,
    label: 'Notification',
    type: 'notification',
  },
  {
    icon: <ThemeIcon />,
    label: 'Dark mode',
    type: 'theme',
  },
  {
    icon: <ChangeAccountlIcon />,
    label: 'Change Account',
    type: 'touchable',
    action: 'CA',
  },
  {
    icon: <LogoutIcon />,
    label: 'Logout',
    type: 'touchable',
    action: 'LO',
  },
];
