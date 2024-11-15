import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {Host} from 'react-native-portalize';
import {SCREEN_STACK} from '@constants/navigation';
import {MainStack, Stack, WelcomeStack} from '@utils/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {CustomDarkTheme, CustomLightTheme} from '@configs/theme';
import {setAccountInfo} from '@store/reducers/account';
import {setLanguage, setThemeMode} from '@store/reducers/setting';
import {changeLanguage, setI18nConfig} from '@locales';
import {setFcmToken, setIsLogin} from '@store/reducers/app';
import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const Navigation = props => {
  const themeMode = useSelector(state => state.settings.themeMode);

  const theme = React.useMemo(() => {
    const _theme = themeMode === 'light' ? CustomLightTheme : CustomDarkTheme;
    return _theme;
  }, [themeMode]);

  const isLogin = useSelector(state => state.app.isLogin);

  const dispatch = useDispatch();

  // dispatch(setAccountInfo({accountInfo: {user: 'Hieu', role: 'student'}}));
  // dispatch(setThemeMode({themeMode: 'light'}));
  // dispatch(setIsLogin({isLogin: false}));
  // changeLanguage('vi');

  React.useEffect(() => {
    setI18nConfig();
  }, []);

  React.useEffect(() => {
    const requestUserPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission denied');
          return;
        }
      }
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        const token = await messaging().getToken();
        console.log('FCM token:', token);
        dispatch(setFcmToken({fcmToken: token}));
      }
    };

    requestUserPermission();
  }, []);
  console.log('isLogin', isLogin);

  return (
    <NavigationContainer theme={theme}>
      <Host>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}>
          {isLogin === true ? (
            <Stack.Screen name={SCREEN_STACK.MAINSTACK} component={MainStack} />
          ) : (
            <Stack.Screen
              name={SCREEN_STACK.WELLCOMESTACK}
              component={WelcomeStack}
            />
          )}
        </Stack.Navigator>
      </Host>
    </NavigationContainer>
  );
};
