import {CloseIcon} from '@assets/icons/closeIcon';
import {EyeIcon} from '@assets/icons/eyeIcon';
import {EyeOffIcon} from '@assets/icons/eyeOffIcon';
import {PasswordIcon} from '@assets/icons/passwordIcon';
import {UserNameIcon} from '@assets/icons/userNameIcon';
import {LoginArrow} from '@assets/svg/loginArrow';
import {Container} from '@components/container';
import {Header} from '@components/header';
import {InputApp} from '@components/input';
import {SCREEN_NAME} from '@constants/navigation';
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
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';

export const LoginScreen = props => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const styles = makeStyle(colors);

  const language = useSelector(state => state?.settings?.language);
  const themeMode = useSelector(state => state.settings.themeMode);

  dispatch(setAccountInfo({accountInfo: {user: 'Hieu', role: 'parent'}}));

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [ischecked, setIsChecked] = useState(false);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      {secureTextEntry ? <EyeIcon /> : <EyeOffIcon />}
    </TouchableWithoutFeedback>
  );

  const onPressLogo = () => {
    navigation.navigate(SCREEN_NAME.HOME);
  };

  const onPressRegister = () => {
    navigation.navigate(SCREEN_NAME.SELECT_ROLE);
  };

  return (
    <Container>
      {/* <Header title={'Login a'} /> */}
      <KeyboardAwareScrollView
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid={true}
        extraScrollHeight={-hp(30)}>
        <ImageBackground
          style={styles.container}
          source={
            themeMode === 'light'
              ? require('@assets/images/light-background.jpg')
              : require('@assets/images/dark-background.jpg')
          }>
          <TouchableOpacity style={styles.logoBackground} onPress={onPressLogo}>
            <FastImage
              source={require('@assets/images/logo.png')}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <Text style={styles.header}>{translate("Let's Login")}!</Text>
          <Text style={styles.description}>
            {translate('Login to Your Account to access the system')}
          </Text>
          <View style={{marginTop: 15}}>
            <Text style={styles.label}>{translate('Username')}</Text>
            <InputApp
              // label={translate('Username')}
              style={styles.input}
              labelStyle={styles.label}
              accessoryLeft={<UserNameIcon />}
            />

            <Text style={styles.label}>{translate('Password')}</Text>
            <InputApp
              // label={translate('Password')}
              style={styles.input}
              labelStyle={styles.label}
              accessoryLeft={<PasswordIcon />}
              secureTextEntry={secureTextEntry}
              accessoryRight={renderIcon}
            />

            <View style={styles.checkBoxContainer}>
              <CheckBox
                checked={ischecked}
                onChange={state => {
                  setIsChecked(state);
                }}
              />
              <Text style={[styles.text, {marginLeft: 10, fontSize: 14}]}>
                {translate('Remember me')}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.loginButton}>
            <View></View>
            <Text style={styles.titleLogin}>{translate('Login')}</Text>
            <LoginArrow />
          </TouchableOpacity>
          <View style={styles.subContainer}>
            <Text style={[styles.text, {fontWeight: '500', fontSize: 15}]}>
              {translate("Don't have account?")}
            </Text>
            <TouchableOpacity onPress={onPressRegister}>
              <Text style={styles.hyperlink}>
                {translate('Register Account')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer} />
        </ImageBackground>
      </KeyboardAwareScrollView>
    </Container>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: hp(2),
    },
    image: {
      height: hp(10),
    },
    logoBackground: {
      backgroundColor: colors.MAIN_HEADER,
      alignSelf: 'center',
      width: wp(50),
      borderRadius: 5,
      marginTop: hp(7),
    },
    header: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.NEUTRAL[900],
      marginTop: 20,
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
      fontWeight: '400',
      marginLeft: 5,
    },
    input: {
      marginTop: 5,
      marginBottom: 10,
      borderRadius: 10,
    },
    label: {
      color: colors.text,
      fontWeight: '500',
      fontSize: 14,
    },
    checkBoxContainer: {
      flexDirection: 'row',
      marginTop: 5,
      marginLeft: 5,
    },
    text: {
      color: colors.text,
    },
    loginButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#0088cc',
      borderRadius: 30,
      paddingVertical: 5,
      paddingHorizontal: 7,
      width: wp(80),
      alignSelf: 'center',
      justifyContent: 'space-between',
      marginTop: 25,
    },
    titleLogin: {
      color: colors.text,
      fontSize: 18,
      fontWeight: '700',
      textAlign: 'center',
      marginLeft: 15,
    },
    subContainer: {
      flexDirection: 'row',
      marginTop: hp(5),
      justifyContent: 'center',
    },
    hyperlink: {
      marginLeft: 5,
      fontWeight: '800',
      color: colors.SECONDARY[900],
      fontSize: 15,
      textDecorationLine: 'underline',
    },
    footer: {marginBottom: hp(5)},
  });
