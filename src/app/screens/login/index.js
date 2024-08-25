import {Container} from '@components/container';
import {Header} from '@components/header';
import {setAccountInfo} from '@store/reducers/account';
import React from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const LoginScreen = props => {
  const language = useSelector(state => state?.settings?.language);
  const dispatch = useDispatch();
  dispatch(setAccountInfo({accountInfo: {user: 'Hieu', role: 'parent'}}));

  return (
    <Container>
      <Header title={'Login a'} />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Login Screen</Text>
        <Text> {language}</Text>
      </View>
    </Container>
  );
};
