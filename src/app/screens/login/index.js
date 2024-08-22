import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';

export const LoginScreen = props => {
  const language = useSelector(state => state?.settings?.language);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Login Screen</Text>
      <Text> {language}</Text>
    </View>
  );
};
