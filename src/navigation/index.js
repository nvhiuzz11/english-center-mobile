import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {Host} from 'react-native-portalize';
import {SCREEN_STACK} from '@constants/navigation';
import {Stack, WelcomeStack} from '@utils/navigation';
import {useSelector} from 'react-redux';
import {CustomDarkTheme, CustomLightTheme} from '@configs/theme';

export const Navigation = props => {
  const themeMode = useSelector(state => state.settings.themeMode);

  const theme = React.useMemo(() => {
    const _theme = themeMode === 'light' ? CustomLightTheme : CustomDarkTheme;
    return _theme;
  }, [themeMode]);

  return (
    <NavigationContainer theme={theme}>
      <Host>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'default',
          }}>
          <Stack.Screen
            name={SCREEN_STACK.WELLCOMESTACK}
            component={WelcomeStack}
          />
        </Stack.Navigator>
      </Host>
    </NavigationContainer>
  );
};
