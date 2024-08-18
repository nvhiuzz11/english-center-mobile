import {SCREEN_NAME} from '@constants/navigation';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Button} from 'react-native';

export const HomeScreen = props => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="123"
        onPress={() => navigation.navigate(SCREEN_NAME.LOGIN)}></Button>
    </View>
  );
};
