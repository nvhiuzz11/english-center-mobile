import {BottomComponent} from '@components/bottomTab';
import {
  REGISTER,
  SCREEN_NAME,
  SCREEN_STACK,
  TAB_NAME,
} from '@constants/navigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '@ui-kitten/components';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {isParent, isStudent, isTeacher} from './user';

export const Stack = createNativeStackNavigator();
export const Tab = createBottomTabNavigator();

//const {accountInfo} = useSelector(state => state.account.accountInfo);

export const WelcomeStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      {/* <Stack.Screen name={SCREEN_NAME.HOME} component={REGISTER.HomeScreen} /> */}
      <Stack.Screen name={SCREEN_NAME.HOME} component={REGISTER.HomeScreen} />
      <Stack.Screen name={SCREEN_NAME.LOGIN} component={REGISTER.LoginScreen} />
      <Stack.Screen
        name={SCREEN_NAME.REGISTER_CLASS}
        component={REGISTER.ResgisterClassScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.SELECT_ROLE}
        component={REGISTER.SelectRoleScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.REGISTER_PROFILE}
        component={REGISTER.RegisterProfileScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.REGISTER_ACCOUNT}
        component={REGISTER.RegisterAccountScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.CLASS_OF_CENTER}
        component={REGISTER.ClassOfCenterScreen}
      />
      <Stack.Screen name={SCREEN_NAME.MAP} component={REGISTER.MapScreen} />
    </Stack.Navigator>
  );
};

export const MainStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}>
      <Stack.Screen name={SCREEN_NAME.BOTTOM_TAB} component={TabBottom} />
      <Stack.Screen name={SCREEN_NAME.LOGIN} component={REGISTER.LoginScreen} />
      <Stack.Screen
        name={SCREEN_NAME.REGISTER_CLASS}
        component={REGISTER.ResgisterClassScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.PERSONAL_INFORMATION}
        component={REGISTER.PersonalInformationScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.DETAIL_STUDENT_CLASS}
        component={REGISTER.DetailStudentClassScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.STUDENT_DETAIL}
        component={REGISTER.StudentDetailScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.FEE_DETAIL}
        component={REGISTER.FeeDetailScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.WAGE_DETAIL}
        component={REGISTER.WageDetailScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.SESSION_CONTENT}
        component={REGISTER.SessionContentScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.SESSION_CONTENT_DETAIL}
        component={REGISTER.SessionContentDetailScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.CLASS_OF_CENTER}
        component={REGISTER.ClassOfCenterScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.DETAIL_TEACHER_CLASS}
        component={REGISTER.DetailTeacherClassScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.STUDENT_OF_CLASS}
        component={REGISTER.StudentOfClassScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.CONTENT_OF_SESSIONS}
        component={REGISTER.ContentOfSessionsScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.ATTENDANCE}
        component={REGISTER.AttendanceScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.EVALUATE_SESSION}
        component={REGISTER.EvaluateSessionScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.NOTIFICATION}
        component={REGISTER.NotificationScreen}
      />
      <Stack.Screen name={SCREEN_NAME.PAY} component={REGISTER.PayScreen} />
      <Stack.Screen name={SCREEN_NAME.MAP} component={REGISTER.MapScreen} />
    </Stack.Navigator>
  );
};

export const TabBottom = () => {
  const insets = useSafeAreaInsets();
  const {colors} = useTheme();

  const {role} = useSelector(state => state.account.accountInfo);

  // console.log('accountInfo', role);

  const renderTabs = React.useCallback(() => {
    if (isStudent(role)) {
      return (
        <>
          <Tab.Screen name={TAB_NAME.HOME_TAB} component={HomeTab} />
          <Tab.Screen
            name={TAB_NAME.CLASS_STUDENT_TAB}
            component={ClassStudentTab}
          />
          <Tab.Screen name={TAB_NAME.SCHEDULE_TAB} component={ScheduleTab} />
          <Tab.Screen name={TAB_NAME.PARENT_TAB} component={ParentTab} />
        </>
      );
    }
    if (isParent(role)) {
      return (
        <>
          <Tab.Screen name={TAB_NAME.HOME_TAB} component={HomeTab} />
          <Tab.Screen name={TAB_NAME.CHILD_TAB} component={ChildTab} />
          <Tab.Screen name={TAB_NAME.FEE_TAB} component={FeeTab} />
        </>
      );
    }
    if (isTeacher(role)) {
      return (
        <>
          <Tab.Screen
            name={TAB_NAME.CLASS_TEACHER_TAB}
            component={ClassTeacherTab}
          />
          <Tab.Screen name={TAB_NAME.SCHEDULE_TAB} component={ScheduleTab} />
          <Tab.Screen name={TAB_NAME.WAGE_TAB} component={WageTab} />
        </>
      );
    }
  }, [role]);

  return (
    <Tab.Navigator
      initialRouteName={TAB_NAME.HOME_TAB}
      screenOptions={{
        headerShown: false,
        tabBarAllowFontScaling: false,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontWeight: '500',
          fontSize: 11,
          marginBottom: 0,
        },
        tabBarLabel: () => null,
      }}
      tabBar={props => (
        <BottomComponent {...props} colors={colors} insets={insets} />
      )}>
      {renderTabs()}
      <Tab.Screen name={TAB_NAME.SETTING_TAB} component={SettingTab} />
    </Tab.Navigator>
  );
};

const HomeTab = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREEN_NAME.HOME} component={REGISTER.HomeScreen} />
    </Stack.Navigator>
  );
};

const ClassStudentTab = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={SCREEN_NAME.CLASS_STUDENT}
        component={REGISTER.ClassStudentScreen}
      />
    </Stack.Navigator>
  );
};

const ScheduleTab = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={SCREEN_NAME.SCHEDULE}
        component={REGISTER.ScheduleScreen}
      />
    </Stack.Navigator>
  );
};

const ChildTab = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREEN_NAME.CHILD} component={REGISTER.ChildScreen} />
    </Stack.Navigator>
  );
};

const ParentTab = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={SCREEN_NAME.PARENT}
        component={REGISTER.ParentScreen}
      />
    </Stack.Navigator>
  );
};

const FeeTab = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREEN_NAME.FEE} component={REGISTER.FeeScreen} />
    </Stack.Navigator>
  );
};

const WageTab = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREEN_NAME.WAGE} component={REGISTER.WageScreen} />
    </Stack.Navigator>
  );
};

const ClassTeacherTab = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={SCREEN_NAME.CLASS_TEACHER}
        component={REGISTER.ClassTeacherScreen}
      />
    </Stack.Navigator>
  );
};

const SettingTab = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={SCREEN_NAME.SETTING}
        component={REGISTER.SettingScreen}
      />
    </Stack.Navigator>
  );
};
