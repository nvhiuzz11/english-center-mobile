import {BackIcon} from '@assets/icons/backIcon';
import {Container} from '@components/container';
import {MainHeader} from '@components/mainHeader';
import {translate} from '@locales';
import {useNavigation, useTheme} from '@react-navigation/native';
import {hp, wp} from '@utils/responsive';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {ModalRecommendLogin} from './components/modalRecommendLogin';
import {SCREEN_NAME} from '@constants/navigation';
import {ModalSelectStudent} from './components/modalSelectStudent';
import {formatDateFromISO, formatMoney} from '@utils/input';
import {useAuxios} from '@src/app/hook';
import {isStudent} from '@utils/user';
import {StatusCodes} from 'http-status-codes';
import {Loading} from '@components/loading';
import Toast from 'react-native-toast-message';

export const ResgisterClassScreen = props => {
  const {courseData} = props.route.params.payload;

  const schedules = courseData.schedules;
  const program = courseData.program;

  const {colors} = useTheme();
  const navigation = useNavigation();
  const styles = makeStyle(colors);

  const isLogin = useSelector(state => state.app.isLogin);
  const {publicAxios, authAxios} = useAuxios();
  const accountInfo = useSelector(state => state.account?.accountInfo);
  const {accessToken} = useSelector(state => state.account);

  const [isVisible, setIsVisible] = useState(false);
  const [showSelectStudent, setShowSelectStudent] = useState(false);
  const [childs, setChilds] = useState([]);
  const [enableRegister, setEnableRegister] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [listChildRegister, setListChildRegister] = useState(null);

  useEffect(() => {
    console.log('accountInfo', accountInfo);
    console.log('accessToken', accessToken);
    console.log(courseData);
    if (isLogin) {
      if (isStudent(accountInfo.role)) {
        checkRegister();
      } else {
        getChild();
      }
    }
  }, []);

  const checkRegister = async () => {
    setIsLoading(true);
    try {
      const res = await authAxios.get('api/registed-checker', {
        params: {studentId: accountInfo.student.id, classId: courseData.id},
      });
      if (res.status === StatusCodes.OK) {
        const isRegisted = res.data.isRegisted;

        console.log('isRegisted', isRegisted);
        if (isRegisted) {
          setEnableRegister(false);
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('checkRegister ~ error', error);
    }
  };

  const checkChildRegister = async idList => {
    try {
      const res = await authAxios.get('api/registed-checker-by-parent', {
        params: {classId: courseData.id, studentId: idList},
      });
      if (res.status === StatusCodes.OK) {
        const registedId = res.data.registedId;
        setListChildRegister(registedId);

        console.log('registedId', registedId);
        // if (isRegisted) {
        //   setEnableRegister(false);
        // }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('checkChildRegister ~ error', error);
    }
  };

  const getChild = async () => {
    setIsLoading(true);
    try {
      const res = await authAxios.get('api/student-connected');
      if (res.status === StatusCodes.OK) {
        const listChild = res.data;
        console.log('res getChild data', res.data);
        setChilds(res.data);

        const idList = listChild.map(child => child.id).join(';');
        checkChildRegister(idList);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('getChild ~ error', error);
    }
  };

  const registerClass = async () => {
    setIsLoading(true);
    try {
      const res = await authAxios.post('api/register-by-student', {
        classId: courseData.id,
      });
      if (res.status === StatusCodes.OK) {
        Toast.show({
          type: 'success',
          props: {
            title: translate('Class registration successful'),
          },
        });
        courseData.studentQuantity += 1;
      }
      setEnableRegister(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        props: {
          title: translate('Class registration fail'),
        },
      });
      console.log('checkRegister ~ error', error);
    }
  };

  const registerForChild = async childId => {
    try {
      const res = await authAxios.post('api/register-by-parent', {
        studentId: childId.id,
        classId: courseData.id,
      });
      if (res.status === StatusCodes.OK) {
        await getChild();

        Toast.show({
          type: 'success',
          props: {
            title: translate('Class registration successful for'),
            subTitle: ` ${childId.name}`,
          },
        });

        courseData.studentQuantity += 1;
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        props: {
          title: translate('Class registration fail'),
        },
      });
      console.log('registerForChild ~ error', error);
    }
  };

  const onPressRegister = async () => {
    if (isLogin) {
      if (isStudent(accountInfo.role)) {
        await registerClass();
      } else {
        setShowSelectStudent(true);
      }
    } else {
      setIsVisible(true);
    }
  };

  const onPressChild = async child => {
    setShowSelectStudent(false);
    console.log('child', child);
    setIsLoading(true);
    await registerForChild(child);
  };

  const onPressCancel = () => {
    setIsVisible(false);
  };

  const onPressLogin = () => {
    setIsVisible(false);
    navigation.navigate(SCREEN_NAME.LOGIN);
  };

  return (
    <Container>
      {isLoading && <Loading />}
      <MainHeader />
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <BackIcon color={colors.PRIMARY.text} />
          <Text style={styles.backButtonTitle}>{translate('Back')}</Text>
        </TouchableOpacity>
        <View style={styles.detailContainer}>
          <Text style={styles.header}>
            {translate('Detailed information class')}
          </Text>
          <Text style={[styles.header, {color: colors.text}]}>
            {courseData.name}
          </Text>
          <View style={styles.row}>
            <Text style={styles.title}>{translate('Class ID')}:</Text>
            <Text style={styles.description}>{courseData.code}</Text>
          </View>
          {/* <View style={styles.row}>
            <Text style={styles.title}>{translate('Class name')}:</Text>
            <Text style={styles.description}>{'E05-L02-2024'}</Text>
          </View> */}
          <View style={styles.row}>
            <Text style={styles.title}>{translate('Ages')}:</Text>
            <Text style={styles.description}>{courseData.fromAge}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>{translate('Course start time')}:</Text>
            <Text style={styles.description}>
              {formatDateFromISO(courseData.startAt)}
            </Text>
          </View>
          <View style={[styles.row, {alignItems: 'flex-start'}]}>
            <Text style={styles.title}>{translate('Class schedule')}:</Text>
            <View>
              {schedules.map((schedule, index) => (
                <Text key={index} style={styles.description}>
                  {schedule.dayLabel} - {schedule.startAt}-{schedule.endAt}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>{translate('Tuition fee')}:</Text>
            <Text style={styles.description}>{formatMoney(1111111)} VND</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>
              {translate('Total number of sessions')}:
            </Text>
            <Text style={styles.description}>
              {courseData.totalSession} {translate('sessions')}
            </Text>
          </View>
          {/* <View style={styles.row}>
            <Text style={styles.title}>
              {translate('Total number of taught sessions')}:
            </Text>
            <Text style={styles.description}>{'E05-L02-2024'}</Text>
          </View> */}
          <View style={styles.row}>
            <Text style={styles.title}>
              {translate('Number of registered students')}:
            </Text>
            <Text style={styles.description}>{courseData.studentQuantity}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>
              {translate('Maximum number of students')}:
            </Text>
            <Text style={styles.description}>{courseData.maxQuantity}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>{translate('Teacher')}:</Text>
            <Text style={styles.description}>
              {courseData.teachers[0]?.name}
            </Text>
          </View>
          {/* <View style={styles.row}>
            <Text style={styles.title}>
              {translate('Teacher qualifications')}:
            </Text>
            <Text style={styles.description}>{'E05-L02-2024'}</Text>
          </View> */}
          {program && (
            <>
              <View style={styles.row}>
                <Text style={styles.title}>{translate('Promotion')}:</Text>
                <Text style={styles.description}>
                  {program.reducePercent} {'%'}
                </Text>
                <Text
                  style={{
                    fontStyle: 'italic',
                    color: colors.SEMANTIC.WARNING[900],
                    fontSize: 14,
                    marginLeft: 5,
                  }}>
                  {'('}
                  {translate('From')} {formatDateFromISO(program.startAt)}{' '}
                  {translate('To')} {formatDateFromISO(program.endAt)}
                  {')'}
                </Text>
              </View>
            </>
          )}
          <View style={styles.row}>
            <Text style={styles.title}>{translate('Center')}:</Text>
            <Text style={styles.description}>{courseData.center.name}</Text>
          </View>
          <Text
            style={[styles.description, {fontSize: 14, fontStyle: 'italic'}]}>
            {courseData.center.address}
          </Text>

          {enableRegister ? (
            <TouchableOpacity style={styles.button} onPress={onPressRegister}>
              <Text style={styles.buttonTitle}>
                {translate('Resgister now!')}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: colors.SEMANTIC.SUCCESS[400]},
              ]}
              onPress={onPressRegister}
              disabled>
              <Text style={styles.buttonTitle}>
                {translate('You have registered for this class')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <ModalRecommendLogin
        isVisible={isVisible}
        onCancel={onPressCancel}
        onLogin={onPressLogin}
      />
      <ModalSelectStudent
        isVisible={showSelectStudent}
        childs={childs}
        onCancel={() => {
          setShowSelectStudent(false);
        }}
        listChildRegister={listChildRegister}
        onPressChild={onPressChild}
      />
    </Container>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    detailContainer: {
      marginHorizontal: wp(5),
      marginTop: hp(2),
      backgroundColor: colors.card,
      borderRadius: 20,
      shadowColor: colors.PRIMARY[900],
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      padding: 20,
      paddingBottom: 24,
      marginBottom: hp(3),
    },
    header: {
      fontSize: 22,
      textAlign: 'center',
      color: colors.text,
      fontWeight: '700',
      color: colors.PRIMARY.text,
      //  marginBottom: 20,
    },
    row: {
      flexDirection: 'row',
      // justifyContent: 'space-between',
      marginVertical: 5,
      alignItems: 'center',
    },
    backButton: {
      flexDirection: 'row',
      backgroundColor: colors.PRIMARY.button,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: colors.PRIMARY.text,
      paddingVertical: 3,
      marginTop: hp(2),
      width: 100,
      justifyContent: 'center',
      marginLeft: wp(2),
    },
    backButtonTitle: {
      color: colors.PRIMARY.text,
      fontSize: 15,
      fontWeight: '600',
      textAlign: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.PRIMARY.text,
    },
    description: {
      color: colors.text,
      fontSize: 16,
      marginLeft: 10,
    },
    button: {
      backgroundColor: colors.PRIMARY.button,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: colors.PRIMARY.text,
      paddingVertical: 5,
      marginTop: 30,
    },
    buttonTitle: {
      color: colors.PRIMARY.text,
      fontSize: 18,
      fontWeight: '700',
      textAlign: 'center',
    },
  });
