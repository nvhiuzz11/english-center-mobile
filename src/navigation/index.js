import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Host} from 'react-native-portalize';
import {SCREEN_STACK} from '@constants/navigation';
import {Stack, WelcomeStack} from '@utils/navigation';

export const Navigation = props => {
  return (
    <NavigationContainer>
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
