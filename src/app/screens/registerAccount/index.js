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
import {SCREEN_NAME} from '@constants/navigation';
import {ROLE} from '@constants/user';
import {translate} from '@locales';
import {useNavigation, useTheme} from '@react-navigation/native';
import {setAccountInfo} from '@store/reducers/account';
import {
  CheckBox,
  Datepicker,
  Icon,
  IndexPath,
  Select,
  SelectItem,
} from '@ui-kitten/components';
import {hp, wp} from '@utils/responsive';
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
import {useDispatch, useSelector} from 'react-redux';

export const RegisterAccountScreen = props => {
  // const role = props.route.params.payload;

  const dispatch = useDispatch();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const styles = makeStyle(colors);

  const language = useSelector(state => state?.settings?.language);
  const themeMode = useSelector(state => state.settings.themeMode);

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [ischecked, setIsChecked] = useState(false);

  const dataGender = ['', translate('Male'), translate('Female')];
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selectedValue = dataGender[selectedIndex];

  const [date, setDate] = useState(new Date());

  const onPressLogo = () => {
    navigation.navigate(SCREEN_NAME.HOME);
  };

  useEffect(() => {
    if (selectedIndex != null) {
      console.log(selectedIndex.row);
    }
  }, [selectedIndex]);

  const onPressContinue = () => {
    navigation.navigate(SCREEN_NAME.REGISTER_ACCOUNT);
  };

  return (
    <Container>
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
          <Text style={styles.header}>{translate('Register account')}</Text>
          {/* <Text style={styles.description}>
            {translate('Login to Your Account to access the system')}
          </Text> */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {translate('Username')}
                <Text style={styles.require}>{' *'}</Text>
              </Text>
              <InputApp
                // label={translate('Username')}
                style={styles.input}
                // accessoryLeft={<UserNameIcon />}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {translate('Password')}
                <Text style={styles.require}>{' *'}</Text>
              </Text>
              <InputApp
                // label={translate('Username')}
                style={styles.input}
                labelStyle={styles.label}
                // accessoryLeft={<UserNameIcon />}
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
                // accessoryLeft={<UserNameIcon />}
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
