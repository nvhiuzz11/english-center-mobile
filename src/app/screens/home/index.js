import {SCREEN_NAME} from '@constants/navigation';
import {changeLanguage, translate} from '@locales';

import {useNavigation, useTheme} from '@react-navigation/native';
import {setAccountInfo} from '@store/reducers/account';
import {setLanguage, setThemeMode} from '@store/reducers/setting';
import React from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const HomeScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const themeMode = useSelector(state => state.settings.themeMode);
  const language = useSelector(state => state.settings.language);
  console.log('themeMode', themeMode);
  console.log('language', language);
  const mode = themeMode === 'light' ? 'dark' : 'light';
  const la = language === 'en' ? 'vi' : 'en';
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: colors.text}}>Home Screen</Text>
      <Text style={{color: colors.text}}>{translate('121')}</Text>
      <Button
        title="123"
        onPress={() => {
          changeLanguage(la);
          dispatch(setThemeMode({themeMode: mode}));
          dispatch(setLanguage({language: la}));
          //navigation.navigate(SCREEN_NAME.LOGIN);
        }}></Button>
    </View>
  );
};
