import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {Host} from 'react-native-portalize';
import {SCREEN_STACK} from '@constants/navigation';
import {MainStack, Stack, WelcomeStack} from '@utils/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {CustomDarkTheme, CustomLightTheme} from '@configs/theme';
import {setAccountInfo} from '@store/reducers/account';
import {setLanguage, setThemeMode} from '@store/reducers/setting';
import {changeLanguage} from '@locales';
import {setIsLogin} from '@store/reducers/app';

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
  // dispatch(setIsLogin({isLogin: 'false'}));
  // changeLanguage('vi');

  return (
    <NavigationContainer theme={theme}>
      <Host>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}>
          {isLogin ? (
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
