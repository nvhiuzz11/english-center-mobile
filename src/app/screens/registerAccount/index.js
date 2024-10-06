import {CloseIcon} from '@assets/icons/closeIcon';
import {DatePickerIcon} from '@assets/icons/datePickerIcon';
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
import {ROLE} from '@constants/user';
import {translate} from '@locales';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useAuxios} from '@src/app/hook';
import {setAccountInfo} from '@store/reducers/account';
import {
  CheckBox,
  Datepicker,
  Icon,
  IndexPath,
  Select,
  SelectItem,
} from '@ui-kitten/components';
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
  KeyboardAvoidingView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';

export const RegisterAccountScreen = props => {
  const {data} = props.route.params.payload;

  const dispatch = useDispatch();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const styles = makeStyle(colors);

  const themeMode = useSelector(state => state.settings.themeMode);

  const {publicAxios} = useAuxios();

  const [securePass, setSecurePass] = useState(true);
  const [secureConfirmPass, setSecureConfirmPass] = useState(true);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const [errUsername, setErrUsername] = useState(null);
  const [errPassword, setErrPassword] = useState(null);
  const [errConfirmPassword, setErrConfirmPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onPressLogo = () => {
    navigation.navigate(SCREEN_NAME.HOME);
  };

  const onPressContinue = async () => {
    setIsLoading(true);
    const isExactData = checkData();
    if (isExactData) {
      const requestData = {
        ...data,
        userName: username,
        password: password,
        confirmPassword: confirmPassword,
      };
      const res = await publicAxios.post('api/auth/signup', requestData);

      console.log('res', res);

      if (res.status === StatusCodes.OK) {
        Toast.show({
          type: 'success',
          props: {
            title: translate('Register account success'),
            // subTitle: '21',
          },
        });

        setIsLoading(false);

        navigation.navigate(SCREEN_NAME.LOGIN, {
          payload: {username: username},
        });
      } else {
        Toast.show({
          type: 'error',
          props: {
            title: translate('Username already exists'),
            // subTitle: '21',
          },
        });
      }

      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const checkData = () => {
    let isExactData = true;
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

    validateField(
      !confirmPassword || isOnlyWhitespace(confirmPassword),
      setErrConfirmPassword,
      'Confirm password cannot be blank',
    );

    if (
      password &&
      !isOnlyWhitespace(password) &&
      confirmPassword &&
      !isOnlyWhitespace(confirmPassword)
    ) {
      validateField(
        password !== confirmPassword,
        setErrConfirmPassword,
        'Confirm password do not match',
      );

      validateField(
        password !== confirmPassword,
        setErrPassword,
        'Passwords do not match',
      );

      if (password === confirmPassword) {
        validateField(
          password && password.length < 8,
          setErrPassword,
          'Password must be at least 8 characters',
        );
        validateField(
          confirmPassword && confirmPassword.length < 8,
          setErrConfirmPassword,
          'Password must be at least 8 characters',
        );
      }
    }

    return isExactData;
  };

  return (
    <Container>
      {isLoading && <Loading />}
      <Header title={'Register'} />
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid={true}
        extraScrollHeight={-hp(30)}>
        <ImageBackground
          style={[styles.container, {paddingHorizontal: wp(5)}]}
          source={
            themeMode === 'light'
              ? require('@assets/images/light-background.jpg')
              : require('@assets/images/dark-background.jpg')
          }>
          <TouchableOpacity style={styles.logoBackground} onPress={onPressLogo}>
            <FastImage
              source={require('@assets/images/logo.png')}
              style={styles.logo}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <Text style={styles.header}>{translate('Register account')}</Text>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {translate('Username')}
                <Text style={styles.require}>{' *'}</Text>
              </Text>
              <InputApp
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                caption={errUsername && errUsername}
                status={errUsername ? 'danger' : 'basic'}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {translate('Password')}
                <Text style={styles.require}>{' *'}</Text>
              </Text>
              <InputApp
                style={styles.input}
                labelStyle={styles.label}
                secureTextEntry={securePass}
                value={password}
                onChangeText={setPassword}
                accessoryRight={
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setSecurePass(!securePass);
                    }}>
                    {securePass ? <EyeIcon /> : <EyeOffIcon />}
                  </TouchableWithoutFeedback>
                }
                caption={errPassword && errPassword}
                status={errPassword ? 'danger' : 'basic'}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {translate('Confirm password')}
                <Text style={styles.require}>{' *'}</Text>
              </Text>
              <InputApp
                // label={translate('Username')}
                style={styles.input}
                labelStyle={styles.label}
                secureTextEntry={secureConfirmPass}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                accessoryRight={
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setSecureConfirmPass(!secureConfirmPass);
                    }}>
                    {setSecureConfirmPass ? <EyeIcon /> : <EyeOffIcon />}
                  </TouchableWithoutFeedback>
                }
                caption={errConfirmPassword && errConfirmPassword}
                status={errConfirmPassword ? 'danger' : 'basic'}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={onPressContinue}>
            <View></View>
            <Text style={styles.titleContinue}>{translate('Continue')}</Text>
            <LoginArrow />
          </TouchableOpacity>
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
    },
    image: {
      height: hp(10),
    },
    logo: {
      height: 50,
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
      marginTop: 20,
    },
    description: {
      fontSize: 15,
      fontWeight: '500',
      color: colors.NEUTRAL[900],
      marginTop: 3,
      fontStyle: 'italic',
    },
    formContainer: {
      marginTop: 20,
      marginBottom: 10,
    },
    inputContainer: {
      marginBottom: 10,
    },
    title: {
      color: colors.text,
      fontWeight: '400',
      marginLeft: 5,
    },
    input: {
      borderRadius: 10,
    },
    label: {
      color: colors.text,
      fontWeight: '500',
      fontSize: 14,
      marginBottom: 5,
    },
    checkBoxContainer: {
      flexDirection: 'row',
      marginTop: 5,
      marginLeft: 5,
    },
    text: {
      color: colors.text,
    },
    require: {
      color: colors.SEMANTIC.ERROR[500],
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
    continueButton: {
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
    titleContinue: {
      color: colors.PRIMARY[900],
      fontSize: 18,
      fontWeight: '700',
      textAlign: 'center',
      marginLeft: 15,
    },
    footer: {marginBottom: hp(5)},
  });
