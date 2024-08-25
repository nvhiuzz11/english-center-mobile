import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {Host} from 'react-native-portalize';
import {SCREEN_STACK} from '@constants/navigation';
import {MainStack, Stack, WelcomeStack} from '@utils/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {CustomDarkTheme, CustomLightTheme} from '@configs/theme';
import {setAccountInfo} from '@store/reducers/account';

export const Navigation = props => {
  const themeMode = useSelector(state => state.settings.themeMode);

  const theme = React.useMemo(() => {
    const _theme = themeMode === 'light' ? CustomLightTheme : CustomDarkTheme;
    return _theme;
  }, [themeMode]);

  const dispatch = useDispatch();

  dispatch(setAccountInfo({accountInfo: {user: 'Hieu', role: 'student'}}));

  return (
    <NavigationContainer theme={theme}>
      <Host>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}>
          <Stack.Screen name={SCREEN_STACK.MAINSTACK} component={MainStack} />
        </Stack.Navigator>
      </Host>
    </NavigationContainer>
  );
};
