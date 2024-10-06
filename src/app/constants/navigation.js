import {ChangeAccountlIcon} from '@assets/icons/changeAccountIcon';
import {LanguagelIcon} from '@assets/icons/languageIcon';
import {LogoutIcon} from '@assets/icons/logoutIcon';
import {NotificationlIcon} from '@assets/icons/notificationIcon';
import {PersonalIcon} from '@assets/icons/pesonalIcon';
import {ThemeIcon} from '@assets/icons/themeIcon';
import {translate} from '@locales';
import {PayScreen} from '@screens/pay';
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
  STUDENT_DETAIL: 'StudentDetailScreen',
  FEE_DETAIL: 'FeeDetailScreen',
  WAGE_DETAIL: 'WageDetailScreen',
  SESSION_CONTENT: 'SessionContentScreen',
  SESSION_CONTENT_DETAIL: 'SessionContentDetailScreen',
  CLASS_OF_CENTER: 'ClassOfCenterScreen',
  DETAIL_TEACHER_CLASS: 'DetailTeacherClassScreen',
  STUDENT_OF_CLASS: 'StudentOfClassScreen',
  CONTENT_OF_SESSIONS: 'ContentOfSessionsScreen',
  ATTENDANCE: 'AttendanceScreen',
  EVALUATE_SESSION: 'EvaluateSessionScreen',
  NOTIFICATION: 'NotificationScreen',
  PAY: 'PayScreen',
  MAP: 'MapScreen',
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
  StudentDetailScreen: register({
    loader: () => import('@screens/studentDetail'),
    extract: SCREEN_NAME.STUDENT_DETAIL,
    name: SCREEN_NAME.STUDENT_DETAIL,
  }),
  FeeDetailScreen: register({
    loader: () => import('@screens/feeDetail'),
    extract: SCREEN_NAME.FEE_DETAIL,
    name: SCREEN_NAME.FEE_DETAIL,
  }),
  WageDetailScreen: register({
    loader: () => import('@screens/wageDetail'),
    extract: SCREEN_NAME.WAGE_DETAIL,
    name: SCREEN_NAME.WAGE_DETAIL,
  }),
  SessionContentScreen: register({
    loader: () => import('@screens/sessionContent'),
    extract: SCREEN_NAME.SESSION_CONTENT,
    name: SCREEN_NAME.SESSION_CONTENT,
  }),
  SessionContentDetailScreen: register({
    loader: () => import('@screens/sessionContentDetail'),
    extract: SCREEN_NAME.SESSION_CONTENT_DETAIL,
    name: SCREEN_NAME.SESSION_CONTENT_DETAIL,
  }),
  ClassOfCenterScreen: register({
    loader: () => import('@screens/classOfCenter'),
    extract: SCREEN_NAME.CLASS_OF_CENTER,
    name: SCREEN_NAME.CLASS_OF_CENTER,
  }),
  DetailTeacherClassScreen: register({
    loader: () => import('@screens/detailTeacherClass'),
    extract: SCREEN_NAME.DETAIL_TEACHER_CLASS,
    name: SCREEN_NAME.DETAIL_TEACHER_CLASS,
  }),
  StudentOfClassScreen: register({
    loader: () => import('@screens/studentOfClass'),
    extract: SCREEN_NAME.STUDENT_OF_CLASS,
    name: SCREEN_NAME.STUDENT_OF_CLASS,
  }),
  ContentOfSessionsScreen: register({
    loader: () => import('@screens/contentOfSeesions'),
    extract: SCREEN_NAME.CONTENT_OF_SESSIONS,
    name: SCREEN_NAME.CONTENT_OF_SESSIONS,
  }),
  AttendanceScreen: register({
    loader: () => import('@screens/attendance'),
    extract: SCREEN_NAME.ATTENDANCE,
    name: SCREEN_NAME.ATTENDANCE,
  }),
  EvaluateSessionScreen: register({
    loader: () => import('@screens/evaluate'),
    extract: SCREEN_NAME.EVALUATE_SESSION,
    name: SCREEN_NAME.EVALUATE_SESSION,
  }),
  NotificationScreen: register({
    loader: () => import('@screens/notification'),
    extract: SCREEN_NAME.NOTIFICATION,
    name: SCREEN_NAME.NOTIFICATION,
  }),
  PayScreen: register({
    loader: () => import('@screens/pay'),
    extract: SCREEN_NAME.PAY,
    name: SCREEN_NAME.PAY,
  }),
  MapScreen: register({
    loader: () => import('@screens/map'),
    extract: SCREEN_NAME.MAP,
    name: SCREEN_NAME.MAP,
  }),
};

export const ROUTES_STUDENT_CLASS = [
  {key: 'first', title: translate('Active Class')},
  {key: 'second', title: translate('Closed Class')},
];

export const ROUTES_STUDENT_CLASS_OF_PARENT = [
  {key: 'first', title: translate('Personal information')},
  {key: 'second', title: translate('Class')},
];

export const ROUTES_CONTENT_OF_SEESION = [
  {key: 'first', title: translate('Attendance')},
  {key: 'second', title: translate('Evaluate the session')},
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
  // {
  //   icon: <ChangeAccountlIcon />,
  //   label: 'Change Account',
  //   type: 'touchable',
  //   action: 'CA',
  // },
  {
    icon: <LogoutIcon />,
    label: 'Logout',
    type: 'touchable',
    action: 'LO',
  },
];
