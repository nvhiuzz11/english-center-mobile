import React, {useEffect, useState} from 'react';
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

export const PersonalInformationScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const isLogin = useSelector(state => state.app.isLogin);

  const [isEditInfor, setIsEditInfor] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [securePass, setSecurePass] = useState(true);
  const [secureConfirmPass, setSecureConfirmPass] = useState(true);

  const [date, setDate] = useState(new Date());

  const dataGender = ['', translate('Male'), translate('Female')];
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const selectedValue = dataGender[selectedIndex];

  useEffect(() => {
    if (selectedIndex != null) {
      //console.log(selectedIndex.row);
    }
  }, [selectedIndex]);

  const renderEyeIcon = (props): React.ReactElement => (
    <TouchableWithoutFeedback
      onPress={() => {
        setSecureTextEntry(!secureTextEntry);
      }}>
      {secureTextEntry ? <EyeIcon /> : <EyeOffIcon />}
    </TouchableWithoutFeedback>
  );

  const onPressCancel = () => {
    setIsEditInfor(false);
  };

  const onPressSave = () => {
    setIsEditInfor(false);
  };

  const onPressCancelPass = () => {
    setIsEditPassword(false);
  };

  const onPressSavePass = () => {
    setIsEditPassword(false);
  };

  return (
    <Container>
      {/* < MainHeader /> */}
      <Header title={translate('Personal information')} />
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid={true}
        extraScrollHeight={-hp(30)}>
        <View style={styles.profileContainer}>
          <Avatar
            size="large"
            source={require('@assets/images/Student-male-avatar.png')}
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
            {isEditInfor ? (
              <>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    {translate('Fullname')}
                    <Text style={styles.require}>{' *'}</Text>
                  </Text>
                  <InputApp style={styles.input} value="Nguyen Van Hieu" />
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
                    placeholder={translate('Select gender')}>
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
                    value="H11 1212n"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    {translate('Phone')}
                    {/* {role === ROLE.PARENT && (
                  <Text style={styles.require}>{' *'}</Text>
                )} */}
                  </Text>
                  <InputApp style={styles.input} labelStyle={styles.label} />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>{translate('Email')}</Text>
                  <InputApp style={styles.input} labelStyle={styles.label} />
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
                  <InputApp
                    style={styles.input}
                    disabled
                    value="Nguyen Van Hieu"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    {translate('Gender')}
                    <Text style={styles.require}>{' *'}</Text>
                  </Text>
                  <InputApp style={styles.input} disabled value="Nam" />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    {translate('Date of birth')}
                    <Text style={styles.require}>{' *'}</Text>
                  </Text>
                  <InputApp style={styles.input} disabled value="11-11-11" />
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
                    value="H11 1212n"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    {translate('Phone')}
                    {/* {role === ROLE.PARENT && (
                  <Text style={styles.require}>{' *'}</Text>
                )} */}
                  </Text>
                  <InputApp
                    style={styles.input}
                    labelStyle={styles.label}
                    disabled
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>{translate('Email')}</Text>
                  <InputApp
                    style={styles.input}
                    labelStyle={styles.label}
                    disabled
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
                  value="123456"
                  disabled
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
                  value="123456"
                  disabled
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
                  value="123456"
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
      marginTop: 70,
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
