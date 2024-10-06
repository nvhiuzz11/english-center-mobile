import {CloseIcon} from '@assets/icons/closeIcon';
import {EyeIcon} from '@assets/icons/eyeIcon';
import {EyeOffIcon} from '@assets/icons/eyeOffIcon';
import {PasswordIcon} from '@assets/icons/passwordIcon';
import {UserNameIcon} from '@assets/icons/userNameIcon';
import {LoginArrow} from '@assets/svg/loginArrow';
import {Container} from '@components/container';
import {Header} from '@components/header';
import {InputApp} from '@components/input';
import {Loading} from '@components/loading';
import {SCREEN_NAME} from '@constants/navigation';
import {translate} from '@locales';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useAuth, useAuxios} from '@src/app/hook';
import {setAccountInfo} from '@store/reducers/account';
import {CheckBox, Icon} from '@ui-kitten/components';
import {isOnlyWhitespace} from '@utils/input';
import {hp, wp} from '@utils/responsive';
import {StatusCodes} from 'http-status-codes';
import React, {useEffect, useState} from 'react';
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
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';

export const LoginScreen = props => {
  const payload = props?.route?.params?.payload;

  const dispatch = useDispatch();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const styles = makeStyle(colors);

  const language = useSelector(state => state?.settings?.language);
  const themeMode = useSelector(state => state.settings.themeMode);
  const account = useSelector(state => state.account);

  const {publicAxios, authAxios} = useAuxios();

  const {saveAccountInfo, saveAuthSate, setIsLogedIn} = useAuth();

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [ischecked, setIsChecked] = useState(false);

  const [username, setUsername] = useState(
    payload?.username ? payload?.username : null,
  );
  const [password, setPassword] = useState(null);
  const [errUsername, setErrUsername] = useState(null);
  const [errPassword, setErrPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const getAccountInfo = async () => {
    console.log('account', account);

    try {
      const res = await authAxios.get('api/auth/me');
      if (res.status === StatusCodes.OK) {
        console.log('res sta', res.status);

        console.log('res data', res.data);
        saveAccountInfo({...res.data, password: password});
      }
    } catch (error) {
      console.log('getAccountInfo ~ error', error);
      setIsLoading(false);
    }
  };

  const onPressLogin = async () => {
    setIsLoading(true);
    const isExactData = checkData();

    const requestData = {
      userName: username,
      password: password,
    };

    if (isExactData) {
      console.log(username, password);

      try {
        const res = await publicAxios.post('api/auth/login', requestData);
        if (res.status === StatusCodes.OK) {
          console.log('res sta', res.status);
          console.log('res data', res.data);
          saveAuthSate(res.data.accessToken, res.data.refreshToken);
          await getAccountInfo();
          await setIsLogedIn();
          setIsLoading(false);
          Toast.show({
            type: 'success',
            props: {
              title: translate('Log in successfully'),
            },
          });
        }
      } catch (error) {
        console.log('login ~ error', error);
        setIsLoading(false);

        Toast.show({
          type: 'error',
          props: {
            title: translate('Login information is incorrects'),
          },
        });
      }
    }

    setIsLoading(false);
  };

  const checkData = () => {
    let isExactData = true;

    console.log(username, password);
    const validateField = (condition, setError, errorMsg) => {
      if (condition) {
        setError(translate(errorMsg));
        isExactData = false;
      } else {
        setError(null);
      }
    };

    validateField(
      !username || isOnlyWhitespace(username),
      setErrUsername,
      'Username cannot be blank',
    );

    validateField(
      !password || isOnlyWhitespace(password),
      setErrPassword,
      'Password cannot be blank',
    );

    return isExactData;
  };

  return (
    <Container>
      {/* <Header title={'Login a'} /> */}
      {isLoading && <Loading />}
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
              style={styles.input}
              labelStyle={styles.label}
              accessoryLeft={<UserNameIcon />}
              value={username}
              onChangeText={setUsername}
              caption={errUsername && errUsername}
              status={errUsername ? 'danger' : 'basic'}
            />

            <Text style={styles.label}>{translate('Password')}</Text>
            <InputApp
              style={styles.input}
              labelStyle={styles.label}
              accessoryLeft={<PasswordIcon />}
              secureTextEntry={secureTextEntry}
              accessoryRight={renderIcon}
              value={password}
              onChangeText={setPassword}
              caption={errPassword && errPassword}
              status={errPassword ? 'danger' : 'basic'}
            />

            <View style={styles.checkBoxContainer}>
              {/* <CheckBox
                checked={ischecked}
                onChange={state => {
                  setIsChecked(state);
                }}
              />
              <Text style={[styles.text, {marginLeft: 10, fontSize: 14}]}>
                {translate('Remember me')}
              </Text> */}
            </View>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={onPressLogin}>
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
