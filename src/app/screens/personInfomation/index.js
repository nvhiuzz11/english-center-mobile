import React, {useEffect, useRef, useState} from 'react';
import {Container} from '@components/container';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  FlatList,
  Button,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MainHeader} from '@components/mainHeader';
import {hp, wp} from '@utils/responsive';
import {CourseItem} from './components/courseItem';
import {Header} from '@components/header';
import {translate} from '@locales';
import {SCREEN_NAME} from '@constants/navigation';
import {setThemeMode} from '@store/reducers/setting';
import {
  Avatar,
  Datepicker,
  IndexPath,
  Select,
  SelectItem,
} from '@ui-kitten/components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {InputApp} from '@components/input';
import {DatePickerIcon} from '@assets/icons/datePickerIcon';
import {EditProfileIcon} from '@assets/icons/editProfileIcon';
import {EyeIcon} from '@assets/icons/eyeIcon';
import {EyeOffIcon} from '@assets/icons/eyeOffIcon';
import {PasswordIcon} from '@assets/icons/passwordIcon';
import {getAvatar, isParent, isStudent} from '@utils/user';
import {ROLE} from '@constants/user';
import {
  calculateAge,
  formatDateFromISO,
  isExactEmail,
  isExactPhoneNumber,
  isOnlyWhitespace,
} from '@utils/input';
import {useAuth, useAuxios} from '@src/app/hook';
import {Loading} from '@components/loading';
import {StatusCodes} from 'http-status-codes';
import Toast from 'react-native-toast-message';
import {l} from 'i18n-js';
import {setCommentRange} from 'typescript';

export const PersonalInformationScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const isLogin = useSelector(state => state.app.isLogin);
  const {accountInfo} = useSelector(state => state.account);
  const {accessToken} = useSelector(state => state.account);

  const {publicAxios, authAxios} = useAuxios();
  const {saveAccountInfo} = useAuth();

  const [isEditInfor, setIsEditInfor] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [securePass, setSecurePass] = useState(true);
  const [secureConfirmPass, setSecureConfirmPass] = useState(true);

  const [date, setDate] = useState(new Date());

  const dataGender = ['', translate('Male'), translate('Female')];
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const selectedValue = dataGender[selectedIndex];

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

  const [pass, setPass] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [errPassword, setErrPassword] = useState(null);
  const [errConfirmPassword, setErrConfirmPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const newPass = useRef(null);

  useEffect(() => {
    // console.log(accountInfo.birthday);
    // setDate(accountInfo.birthday);
    console.log('accountInfo', accountInfo, accessToken);
    setIsLoading(true);
    fectchAccountInfo();
    //getInfo();
  }, []);

  const getInfo = () => {
    setName(accountInfo.name);
    setAddress(accountInfo.address);
    setPhone(accountInfo.phone);
    setEmail(accountInfo.email);
    setPass(accountInfo.password);
    if (accountInfo.gender === 1) {
      setSelectedIndex(new IndexPath(0));
    } else {
      setSelectedIndex(new IndexPath(1));
    }
    if (accountInfo.birthday) {
      setDate(new Date(accountInfo.birthday));
    }
  };

  const fectchAccountInfo = async () => {
    try {
      const res = await authAxios.get('api/auth/me');
      if (res.status === StatusCodes.OK) {
        console.log('res data', res.data);
        const info = res.data;

        setName(info.name);
        setAddress(info.address);
        setPhone(info.phone);
        setEmail(info.email);
        setPass(accountInfo.password);
        if (info.gender === 1) {
          setSelectedIndex(new IndexPath(0));
        } else {
          setSelectedIndex(new IndexPath(1));
        }
        if (info.birthday) {
          setDate(new Date(info.birthday));
        }

        saveAccountInfo({
          ...res.data,
          password: newPass.current || accountInfo.password,
        });
        newPass.current = null;
      }
      setIsLoading(false);
    } catch (error) {
      console.log('fectchAccountInfo ~ error', error);
      setIsLoading(false);
    }
  };

  const onPressCancel = () => {
    getInfo();
    setIsEditInfor(false);
  };

  const onPressSave = async () => {
    setIsLoading(true);

    const isExactData = checkData();

    if (isExactData) {
      const requestData = {
        name: name,
        gender: selectedIndex?.row + 1,
        birthday: date.toISOString(),
        age: calculateAge(date),
        phone: phone || null,
        email: email || null,
        address: address,
      };

      console.log('data', requestData);

      try {
        const res = await authAxios.put('api/my-user-detail', requestData);
        if (res.status === StatusCodes.OK) {
          console.log('res  update data', res.data);

          await fectchAccountInfo();
          //  getInfo();

          setIsLoading(false);
          Toast.show({
            type: 'success',
            props: {
              title: translate('Update information successfully'),
            },
          });

          setIsEditInfor(false);
        }
      } catch (error) {
        console.log('update ~ error', error);
        setIsLoading(false);

        Toast.show({
          type: 'error',
          props: {
            title: translate('Update information is fail'),
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

    if (!isStudent(accountInfo.role)) {
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
  };

  const checkPassData = () => {
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

  const onPressCancelPass = () => {
    setIsEditPassword(false);
    setPassword(null);
    setConfirmPassword(null);
  };

  const onPressSavePass = async () => {
    setIsLoading(true);
    const isExactData = checkPassData();

    if (isExactData) {
      const requestData = {
        oldPassword: pass,
        password: password,
        confirmPassword: confirmPassword,
      };
      console.log('requestData', requestData);

      try {
        const res = await authAxios.put('api/user-password', requestData);
        if (res.status === StatusCodes.OK) {
          console.log('res  update data', res.data);
          newPass.current = password;
          setPass(password);
          fectchAccountInfo();
          //getInfo();

          setIsLoading(false);
          Toast.show({
            type: 'success',
            props: {
              title: translate('Update password successfully'),
            },
          });

          setIsEditPassword(false);
        }
      } catch (error) {
        console.log('update ~ error', error);
        setIsLoading(false);

        Toast.show({
          type: 'error',
          props: {
            title: translate('Update password is fail'),
          },
        });
      }

      setPassword(null);
      setConfirmPassword(null);
    }

    setIsLoading(false);
  };

  return (
    <Container>
      {isLoading && <Loading />}
      <Header title={translate('Personal information')} />
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid={true}
        extraScrollHeight={hp(30)}>
        <View style={styles.profileContainer}>
          <Avatar
            size="large"
            source={getAvatar(accountInfo.role, accountInfo.gender)}
            style={styles.avatar}
          />
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              setIsEditInfor(!isEditInfor);
            }}>
            <EditProfileIcon color={colors.PRIMARY[900]} />
          </TouchableOpacity>

          <View style={styles.inforContainer}>
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
                textAlign: 'center',
                fontWeight: '800',
                marginBottom: 10,
              }}>
              ID: {accountInfo.id}
            </Text>
            {isEditInfor ? (
              <>
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
                    size="large"
                    onSelect={index => {
                      setSelectedIndex(index);
                      console.log('index', index);
                    }}
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
                    size="large"
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
                    {accountInfo.role !== ROLE.STUDENT && (
                      <Text style={styles.require}>{' *'}</Text>
                    )}
                  </Text>
                  <InputApp
                    style={styles.input}
                    labelStyle={styles.label}
                    value={phone}
                    onChangeText={setPhone}
                    caption={errPhone && errPhone}
                    status={errPhone ? 'danger' : 'basic'}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    {translate('Email')}
                    {accountInfo.role === ROLE.TEACHER && (
                      <Text style={styles.require}>{' *'}</Text>
                    )}
                  </Text>
                  <InputApp
                    style={styles.input}
                    labelStyle={styles.label}
                    value={email}
                    onChangeText={setEmail}
                    caption={errEmail && errEmail}
                    status={errEmail ? 'danger' : 'basic'}
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {backgroundColor: colors.SEMANTIC.ERROR[500]},
                    ]}
                    onPress={onPressCancel}>
                    <Text style={styles.buttonTitle}>
                      {translate('Cancle')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {backgroundColor: colors.SEMANTIC.SUCCESS[500]},
                    ]}
                    onPress={onPressSave}>
                    <Text style={styles.buttonTitle}>{translate('Save')}</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    {translate('Fullname')}
                    <Text style={styles.require}>{' *'}</Text>
                  </Text>
                  <InputApp style={styles.input} disabled value={name} />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    {translate('Gender')}
                    <Text style={styles.require}>{' *'}</Text>
                  </Text>
                  <InputApp
                    style={styles.input}
                    disabled
                    value={
                      accountInfo.gender === 1
                        ? translate('Male')
                        : translate('Female')
                    }
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    {translate('Date of birth')}
                    <Text style={styles.require}>{' *'}</Text>
                  </Text>
                  <InputApp
                    style={styles.input}
                    disabled
                    value={
                      accountInfo.birthday &&
                      formatDateFromISO(accountInfo.birthday)
                    }
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
                    disabled
                    value={address}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    {translate('Phone')}
                    {accountInfo.role !== ROLE.STUDENT && (
                      <Text style={styles.require}>{' *'}</Text>
                    )}
                  </Text>
                  <InputApp
                    style={styles.input}
                    labelStyle={styles.label}
                    disabled
                    value={phone}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    {translate('Email')}
                    {accountInfo.role === ROLE.TEACHER && (
                      <Text style={styles.require}>{' *'}</Text>
                    )}
                  </Text>

                  <InputApp
                    style={styles.input}
                    labelStyle={styles.label}
                    disabled
                    value={email}
                  />
                </View>
              </>
            )}
          </View>
        </View>
        <View style={styles.passwordConainer}>
          <TouchableOpacity
            style={[styles.editButton, {top: 20, right: 20}]}
            onPress={() => {
              setIsEditPassword(!isEditPassword);
            }}>
            <EditProfileIcon color={colors.PRIMARY[900]} />
          </TouchableOpacity>

          {isEditPassword ? (
            <>
              <View style={[styles.inputContainer, {marginTop: 15}]}>
                <Text style={styles.label}>{translate('Password')}</Text>
                <InputApp
                  // label={translate('Password')}
                  style={styles.input}
                  labelStyle={styles.label}
                  secureTextEntry={securePass}
                  accessoryRight={
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setSecurePass(!securePass);
                      }}>
                      {securePass ? <EyeIcon /> : <EyeOffIcon />}
                    </TouchableWithoutFeedback>
                  }
                  value={password && password}
                  onChangeText={setPassword}
                  caption={errPassword && errPassword}
                  status={errPassword ? 'danger' : 'basic'}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  {translate('Confirm password')}
                </Text>
                <InputApp
                  // label={translate('Password')}
                  style={styles.input}
                  labelStyle={styles.label}
                  secureTextEntry={secureConfirmPass}
                  accessoryRight={
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setSecureConfirmPass(!secureConfirmPass);
                      }}>
                      {setSecureConfirmPass ? <EyeIcon /> : <EyeOffIcon />}
                    </TouchableWithoutFeedback>
                  }
                  value={confirmPassword && confirmPassword}
                  onChangeText={setConfirmPassword}
                  caption={errConfirmPassword && errConfirmPassword}
                  status={errConfirmPassword ? 'danger' : 'basic'}
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {backgroundColor: colors.SEMANTIC.ERROR[500]},
                  ]}
                  onPress={onPressCancelPass}>
                  <Text style={styles.buttonTitle}>{translate('Cancle')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {backgroundColor: colors.SEMANTIC.SUCCESS[500]},
                  ]}
                  onPress={onPressSavePass}>
                  <Text style={styles.buttonTitle}>{translate('Save')}</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={[styles.inputContainer, {marginTop: 15}]}>
                <Text style={styles.label}>{translate('Password')}</Text>
                <InputApp
                  // label={translate('Password')}
                  style={styles.input}
                  labelStyle={styles.label}
                  secureTextEntry={secureTextEntry}
                  accessoryRight={
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setSecureTextEntry(!secureTextEntry);
                      }}>
                      {secureTextEntry ? <EyeIcon /> : <EyeOffIcon />}
                    </TouchableWithoutFeedback>
                  }
                  value={pass}
                  disabled
                />
              </View>
            </>
          )}
        </View>
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
    columnContainer: {
      backgroundColor: colors.NEUTRAL[50],
      marginTop: 20,
    },
    header: {
      fontSize: 22,
      color: colors.SECONDARY[800],
      fontWeight: '700',
      textAlign: 'center',
    },
    profileContainer: {
      marginTop: 80,
      backgroundColor: colors.card,
      borderRadius: 20,
      shadowColor: colors.PRIMARY[900],
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.9,
      elevation: 5,
      padding: 20,
      paddingBottom: 24,
    },
    avatar: {
      width: 120,
      height: 120,
      borderWidth: 3,
      borderColor: '#167F71',
      alignSelf: 'center',
      position: 'absolute',
      top: -60,
      backgroundColor: colors.NEUTRAL[700],
    },
    editButton: {
      position: 'absolute',
      right: 20,
      top: 30,
      backgroundColor: colors.NEUTRAL[800],
    },
    inforContainer: {
      marginTop: 50,
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
    buttonContainer: {
      flexDirection: 'row',
      marginTop: 15,
    },
    button: {
      flex: 1,
      backgroundColor: 'red',
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 10,
      marginHorizontal: 10,
    },
    buttonTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    passwordConainer: {
      marginTop: 30,
      backgroundColor: colors.card,
      borderRadius: 20,
      shadowColor: colors.PRIMARY[900],
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.9,
      elevation: 5,
      padding: 20,
      paddingBottom: 24,
      marginBottom: hp(5),
    },
  });
