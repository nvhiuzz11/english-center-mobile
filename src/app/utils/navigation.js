import {REGISTER, SCREEN_NAME} from '@constants/navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

export const Stack = createNativeStackNavigator();

export const WelcomeStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'default',
      }}>
      <Stack.Screen name={SCREEN_NAME.HOME} component={REGISTER.HomeScreen} />
      <Stack.Screen name={SCREEN_NAME.LOGIN} component={REGISTER.LoginScreen} />
    </Stack.Navigator>
  );
};
