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
import {
  calculateAge,
  isExactEmail,
  isExactPhoneNumber,
  isOnlyWhitespace,
  validateField,
} from '@utils/input';
import {hp, wp} from '@utils/responsive';
import {l} from 'i18n-js';
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

import {API_URL} from '@env';
import Toast from 'react-native-toast-message';
import {CAPTION_TYPE} from '@constants/input';
import {isParent} from '@utils/user';

export const RegisterProfileScreen = props => {
  const {role} = props.route.params.payload;

  const dispatch = useDispatch();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const styles = makeStyle(colors);

  const language = useSelector(state => state?.settings?.language);
  const themeMode = useSelector(state => state.settings.themeMode);

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [ischecked, setIsChecked] = useState(false);

  const dataGender = ['2', translate('Male'), translate('Female')];
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selectedValue = dataGender[selectedIndex];

  const [date, setDate] = useState(new Date());
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);

  const [errName, setErrName] = useState(null);
  const [errGender, setErrGender] = useState(null);
  const [errDate, setErrDate] = useState(null);
  const [errAddress, setErrAddress] = useState(null);
  const [errPhone, setErrPhone] = useState(null);
  const [errEmail, setErrEmail] = useState(null);

  const onPressLogo = () => {
    navigation.navigate(SCREEN_NAME.HOME);
  };

  useEffect(() => {
    if (selectedIndex != null) {
      // console.log(selectedIndex.row);
    }
  }, [selectedIndex]);

  const onPressContinue = () => {
    const isExactData = checkData();

    if (isExactData) {
      const data = {
        role: role,
        name: name,
        gender: selectedIndex?.row + 1,
        birthday: date.toISOString(),
        age: calculateAge(date),
        phone: phone,
        email: email,
        address: address,
      };

      navigation.navigate(SCREEN_NAME.REGISTER_ACCOUNT, {
        payload: {data: data},
      });
    }
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
      !name || isOnlyWhitespace(name),
      setErrName,
      'Data cannot be blank',
    );
    validateField(
      selectedIndex?.row === undefined,
      setErrGender,
      'Data cannot be blank',
    );
    validateField(
      !address || isOnlyWhitespace(address),
      setErrAddress,
      'Data cannot be blank',
    );

    // Kiểm tra số điện thoại

    if (isParent(role)) {
      validateField(!phone, setErrPhone, 'Data cannot be blank');
      if (phone) {
        validateField(
          phone && !isExactPhoneNumber(phone),
          setErrPhone,
          'Phone number is incorrect',
        );
      }
    } else {
      validateField(
        phone && !isExactPhoneNumber(phone),
        setErrPhone,
        'Phone number is incorrect',
      );
    }

    // Kiểm tra email
    validateField(
      email && !isExactEmail(email),
      setErrEmail,
      'Email is incorrect',
    );

    return isExactData;

    // if (!name || isOnlyWhitespace(name)) {
    //   setErrName(translate('Data cannot be blank'));
    //   isExactData = false;
    // } else {
    //   setErrName(null);
    // }

    // if (!selectedIndex?.row) {
    //   setErrGender(translate('Data cannot be blank'));
    //   isExactData = false;
    // } else {
    //   setErrGender(null);
    // }

    // if (!address || isOnlyWhitespace(address)) {
    //   setErrAddress(translate('Data cannot be blank'));
    //   isExactData = false;
    // } else {
    //   setErrAddress(null);
    // }

    // if (!isExactPhoneNumber(phone) && phone) {
    //   setErrPhone(translate('Phone number is incorrect')); //Số điện thoại không chính xác
    //   isExactData = false;
    // } else {
    //   setErrPhone(null);
    // }

    // if (isParent(role)) {
    //   if (!phone) {
    //     setErrPhone(translate('Data cannot be blank'));
    //     isExactData = false;
    //   }
    // }

    // if (email && !isExactEmail(email)) {
    //   setErrEmail(translate('Email is incorrect'));
    //   isExactData = false;
    // } else {
    //   setErrEmail(null);
    // }

    // return isExactData;
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
          }>
          <TouchableOpacity style={styles.logoBackground} onPress={onPressLogo}>
            <FastImage
              source={require('@assets/images/logo.png')}
              style={styles.logo}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <Text style={styles.header}>
            {translate('Enter your personal information')}
          </Text>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {translate('Fullname')}
                <Text style={styles.require}>{' *'}</Text>
              </Text>
              <InputApp
                style={styles.input}
                value={name}
                onChangeText={setName}
                caption={errName && errName}
                status={errName ? 'danger' : 'basic'}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {translate('Gender')}
                <Text style={styles.require}>{' *'}</Text>
              </Text>
              <Select
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}
                value={
                  selectedIndex !== null ? dataGender[selectedIndex] : null
                }
                placeholder={translate('Select gender')}
                caption={errGender && errGender}
                status={errGender ? 'danger' : 'basic'}>
                <SelectItem title={translate('Male')} />
                <SelectItem title={translate('Female')} />
              </Select>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {translate('Date of birth')}
                <Text style={styles.require}>{' *'}</Text>
              </Text>
              <Datepicker
                style={{color: 'black'}}
                max={new Date(2055, 0, 1)}
                min={new Date(1900, 0, 1)}
                date={date}
                onSelect={nextDate => setDate(nextDate)}
                placeholder={translate('Select date')}
                accessoryRight={<DatePickerIcon />}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {translate('Address')}
                <Text style={styles.require}>{' *'}</Text>
              </Text>
              <InputApp
                style={styles.input}
                labelStyle={styles.label}
                value={address}
                onChangeText={setAddress}
                caption={errAddress && errAddress}
                status={errAddress ? 'danger' : 'basic'}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {translate('Phone')}
                {role === ROLE.PARENT && (
                  <Text style={styles.require}>{' *'}</Text>
                )}
              </Text>
              <InputApp
                // label={translate('Username')}
                style={styles.input}
                labelStyle={styles.label}
                value={phone}
                onChangeText={setPhone}
                caption={errPhone && errPhone}
                status={errPhone ? 'danger' : 'basic'}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{translate('Email')}</Text>
              <InputApp
                // label={translate('Username')}
                style={styles.input}
                labelStyle={styles.label}
                value={email}
                onChangeText={setEmail}
                captionType={CAPTION_TYPE.ERROR}
                caption={errEmail && errEmail}
                status={errEmail ? 'danger' : 'basic'}
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
