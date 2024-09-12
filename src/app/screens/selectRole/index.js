import {CloseIcon} from '@assets/icons/closeIcon';
import {EyeIcon} from '@assets/icons/eyeIcon';
import {EyeOffIcon} from '@assets/icons/eyeOffIcon';
import {PasswordIcon} from '@assets/icons/passwordIcon';
import {UserNameIcon} from '@assets/icons/userNameIcon';
import {LoginArrow} from '@assets/svg/loginArrow';
import {Parent} from '@assets/svg/parent';
import {Container} from '@components/container';
import {Header} from '@components/header';
import {InputApp} from '@components/input';
import {SCREEN_NAME} from '@constants/navigation';
import {ROLE} from '@constants/user';
import {translate} from '@locales';
import {useNavigation, useTheme} from '@react-navigation/native';
import {setAccountInfo} from '@store/reducers/account';
import {CheckBox, Icon} from '@ui-kitten/components';
import {hp, wp} from '@utils/responsive';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';

export const SelectRoleScreen = props => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const styles = makeStyle(colors);

  const language = useSelector(state => state?.settings?.language);
  const themeMode = useSelector(state => state.settings.themeMode);

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [ischecked, setIsChecked] = useState(false);

  const onPressLogo = () => {
    navigation.navigate(SCREEN_NAME.HOME);
  };

  const onSelectRole = role => {
    navigation.navigate(SCREEN_NAME.REGISTER_PROFILE, {
      payload: {role: role},
    });
  };

  return (
    <Container>
      <Header title={'Register'} />
      <ImageBackground
        style={[styles.container, {paddingHorizontal: wp(5)}]}
        source={
          themeMode === 'light'
            ? require('@assets/images/light-background.jpg')
            : require('@assets/images/dark-background.jpg')
        }
        // source={require('@assets/images/dark-background.jpg')}
      >
        <TouchableOpacity style={styles.logoBackground} onPress={onPressLogo}>
          <FastImage
            source={require('@assets/images/logo.png')}
            style={styles.logo}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Text style={styles.header}>
          {translate('Please select your role to continue')}:
        </Text>
        <TouchableHighlight
          style={styles.roleContainer}
          underlayColor={colors.SECONDARY[100]}
          onPress={() => {
            onSelectRole(ROLE.PARENT);
          }}>
          <View>
            <Parent />
            <Text style={styles.title}>{translate('Parent')}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.roleContainer}
          underlayColor={colors.SECONDARY[100]}
          onPress={() => {
            onSelectRole(ROLE.STUDENT);
          }}>
          <View>
            <FastImage
              source={require('@assets/images/child.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.title}>{translate('Student')}</Text>
          </View>
        </TouchableHighlight>
      </ImageBackground>
    </Container>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: hp(2),
    },
    logo: {
      height: 50,
    },
    image: {
      width: 150,
      height: 150,
    },
    logoBackground: {
      backgroundColor: colors.MAIN_HEADER,
      width: 120,
      borderRadius: 5,
      marginTop: hp(2),
    },
    header: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.NEUTRAL[900],
      marginTop: 30,
      marginBottom: 20,
    },
    description: {
      fontSize: 15,
      fontWeight: '500',
      color: colors.NEUTRAL[900],
      marginTop: 3,
      fontStyle: 'italic',
    },
    title: {
      color: colors.text,
      fontSize: 20,
      fontWeight: '700',
      marginTop: 10,
      textAlign: 'center',
    },
    roleContainer: {
      paddingVertical: 20,
      backgroundColor: colors.card,
      borderRadius: 20,
      shadowColor: colors.PRIMARY[900],
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      alignItems: 'center',
      marginVertical: 15,
    },
  });
