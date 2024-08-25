import React from 'react';
import {Container} from '@components/container';
import {SCREEN_NAME} from '@constants/navigation';
import {changeLanguage, translate} from '@locales';
import {useNavigation, useTheme} from '@react-navigation/native';
import {setAccountInfo} from '@store/reducers/account';
import {setLanguage, setThemeMode} from '@store/reducers/setting';
import {View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Header} from '@components/header';
import {MainHeader} from '@components/mainHeader';

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
    <Container>
      {/* <Header title={'Hoome a'} /> */}

      <MainHeader />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: colors.text}}>Home Screen</Text>
        <Text style={{color: colors.text}}>{translate('121')}</Text>
        <Button
          title="123"
          onPress={() => {
            dispatch(setThemeMode({themeMode: mode}));
            // dispatch(
            //   setAccountInfo({accountInfo: {user: 'Hieu', role: 'parent'}}),
            // );

            //dispatch(setLanguage({language: la}));
            navigation.navigate(SCREEN_NAME.LOGIN);
          }}></Button>
      </View>
    </Container>
  );
};
