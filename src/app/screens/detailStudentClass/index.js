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
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MainHeader} from '@components/mainHeader';
import {hp, wp} from '@utils/responsive';
import {CourseItem} from './components/courseItem';
import {Header} from '@components/header';
import {SCREEN_NAME} from '@constants/navigation';
import {setThemeMode} from '@store/reducers/setting';
import {InputApp} from '@components/input';
import {SearchIcon} from '@assets/icons/searchIcon';
import {FilterHomeIcon} from '@assets/icons/filterHomeIcon';
import {translate} from '@locales';
import {DrawerLayout} from 'react-native-gesture-handler';
import {ModalFilterClass} from './components/ModalFilterClass';
import {ModalAttendance} from './components/modalAttendance';
import {useAuxios} from '@src/app/hook';
import {Loading} from '@components/loading';
import {formatDateFromISO, formatMoney} from '@utils/input';
import {CLASS_STATUS} from '@constants/user';
import {isParent, isStudent} from '@utils/user';
import Toast from 'react-native-toast-message';
import {StatusCodes} from 'http-status-codes';

export const DetailStudentClassScreen = props => {
  const {classId, studentId, childInfo} = props.route.params.payload;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const {accountInfo} = useSelector(state => state.account);

  const [isShowAttendance, setIsShowAttendance] = useState(false);

  const {publicAxios, authAxios} = useAuxios();

  const [isLoading, setIsLoading] = useState(true);
  const [classInfo, setClassInfo] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [listAttendance, setListAttendance] = useState(null);
  const [attendOfStudent, setAttendOfStudent] = useState(null);

  useEffect(() => {
    fetchClasses();
    if (isParent(accountInfo.role)) {
      //fetchReview();
    }
  }, []);

  useEffect(() => {
    if (classInfo) {
      if (classInfo.status !== CLASS_STATUS.COMMING) {
        fetchAttendance();
      }
    }
  }, [classInfo]);

  const fetchAttendance = async () => {
    try {
      let response;
      let idStudent;

      if (isParent(accountInfo.role)) {
        response = await authAxios.get('api/review-by-parent', {
          params: {classId: classId, studentId: studentId},
        });
        idStudent = studentId;
      } else {
        response = await authAxios.get('api/review-by-student', {
          params: {classId: classId},
        });
        idStudent = accountInfo.student.id;
      }

      if (response.status === StatusCodes.OK) {
        console.log('fetchAttendance res  :', response.data);

        const docs = response.data.docs;
        setListAttendance(docs);
        if (docs.length > 0) {
          docs.sort((a, b) => new Date(b.date) - new Date(a.date));

          const attendanceList = docs.map(attendance => {
            return {
              date: attendance.date,
              attend: attendance.studentIds.includes(idStudent),
            };
          });

          console.log('attendanceList', attendanceList);

          setAttendOfStudent(attendanceList);
        } else {
          setAttendOfStudent([]);
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('fetchAttendance error', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await publicAxios.get(`api/class/${classId}`, {
        params: {
          includeTeacher: true,
          includeCenter: true,
          includeProgram: true,
          includeSchedule: true,
        },
      });
      console.log('fetchClasses detail res :', response.data);
      setClassInfo(response.data);
      if (isStudent(accountInfo.role)) {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('fetchClasses detail error', error);
    }
  };

  const onPressContent = () => {
    navigation.navigate(SCREEN_NAME.SESSION_CONTENT, {
      payload: {
        listAttendance: listAttendance,
        classInfo: classInfo,
        childInfo: childInfo,
      },
    });
  };

  const unsubscribeStudent = async () => {
    setIsLoading(true);
    try {
      const response = await authAxios.post('api/unregister-by-student', {
        classId: classId,
      });
      if (response.status === StatusCodes.OK) {
        console.log('unsubscribeStudent res  :', response.data);

        Toast.show({
          type: 'success',
          props: {
            title: translate('Unsubscribe successfully'),
          },
        });

        setIsLoading(false);

        navigation.navigate(SCREEN_NAME.CLASS_STUDENT);
      }
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        props: {
          title: translate('Unsubscribe fail'),
        },
      });
      console.error('unsubscribeStudent error', error);
    }
  };

  const unsubscribeParent = async () => {
    setIsLoading(true);
    try {
      const response = await authAxios.post('api/unregister-by-parent', {
        studentId: studentId,
        classId: classId,
      });
      if (response.status === StatusCodes.OK) {
        console.log('unsubscribeParent res  :', response.data);

        Toast.show({
          type: 'success',
          props: {
            title: translate('Unsubscribe successfully'),
          },
        });

        setIsLoading(false);
        navigation.navigate(SCREEN_NAME.STUDENT_DETAIL, {
          payload: {childInfo: childInfo},
        });
      }
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        props: {
          title: translate('Unsubscribe fail'),
        },
      });
      console.error('unsubscribeParent error', error);
    }
  };

  const onPressUnsubscribe = async () => {
    // navigation.navigate(SCREEN_NAME.SESSION_CONTENT);
    if (isStudent(accountInfo.role)) {
      await unsubscribeStudent();
    } else {
      await unsubscribeParent();
    }
  };

  return (
    <Container>
      {isLoading && <Loading />}
      <Header title={translate('Detail class')} />
      {classInfo && (
        <ScrollView style={styles.container}>
          <View style={styles.detailContainer}>
            <Text style={styles.className}>{classInfo.name}</Text>
            <View style={styles.row}>
              <Text style={styles.title}>
                {translate('Class ID')}:{'   '}
                <Text style={styles.description}>{classInfo.code}</Text>
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>
                {translate('Ages')}:{' '}
                <Text style={styles.description}>{classInfo.fromAge}</Text>
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>
                {translate('Number of students')}:{'   '}
                <Text style={styles.description}>
                  {classInfo.studentQuantity} {translate('students')}
                </Text>
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>
                {translate('Time start')}:{'   '}
                <Text style={styles.description}>
                  {formatDateFromISO(classInfo.startAt)}
                </Text>
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>
                {translate('Number of sessions held')}:{'   '}
                <Text style={styles.description}>
                  {classInfo.teachedSession}
                  {'/'}
                  {classInfo.totalSession} {translate('sessions')}
                </Text>
              </Text>
            </View>
            <View
              style={[
                styles.row,
                {
                  flexDirection: 'row',
                },
              ]}>
              <Text style={styles.title}>{translate('Class schedule')}: </Text>
              <View style={{marginLeft: 50}}>
                {classInfo.schedules.map((schedule, index) => (
                  <Text key={index} style={styles.description}>
                    {schedule.dayLabel} - {schedule.startAt}-{schedule.endAt}
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.row}>
              {classInfo.status !== CLASS_STATUS.COMMING && (
                <>
                  <Text style={styles.title}>
                    {translate('Number of absent sessions')}:{'   '}
                    <Text style={styles.description}>
                      {attendOfStudent?.filter(entry => !entry.attend).length}{' '}
                      {translate('sessions')}
                    </Text>
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setIsShowAttendance(true);
                    }}>
                    <Text style={styles.highlight}>
                      {translate('Attendance detail')}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>
                {translate('Tuition fee')}:{'   '}
                <Text style={styles.description}>
                  {formatMoney(classInfo.fee)} {'VND'}
                </Text>
              </Text>
            </View>
            {classInfo.program && (
              <View style={styles.row}>
                <Text style={styles.title}>
                  {translate('Tuition reduction')}:{'   '}
                  <Text style={styles.description}>
                    {classInfo.program.reducePercent} {'%'}
                  </Text>
                </Text>
              </View>
            )}
            <View style={styles.row}>
              <Text style={styles.title}>
                {translate('Center')}:{'   '}
                <Text style={styles.description}>
                  {translate('Center')} {classInfo.center.id}-
                  {classInfo.center.name}
                </Text>
              </Text>
            </View>
            <Text
              style={[
                styles.description,
                {fontSize: 14, fontStyle: 'italic', textAlign: 'center'},
              ]}>
              {classInfo.center.address}
            </Text>
            {classInfo.status === CLASS_STATUS.COMMING && (
              <TouchableOpacity
                style={styles.button}
                onPress={onPressUnsubscribe}>
                <Text style={styles.buttonTitle}>
                  {translate('Unsubscribe')}
                </Text>
              </TouchableOpacity>
            )}
            {classInfo.status !== CLASS_STATUS.COMMING &&
              isParent(accountInfo.role) && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={onPressContent}>
                  <Text style={styles.buttonTitle}>
                    {translate('Content of sessions')}
                  </Text>
                </TouchableOpacity>
              )}
          </View>
        </ScrollView>
      )}

      <ModalAttendance
        attendOfStudent={attendOfStudent}
        isVisible={isShowAttendance}
        onClose={() => {
          setIsShowAttendance(false);
        }}
      />
    </Container>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: wp(2),
    },
    classContainer: {
      marginTop: 30,
    },
    columnContainer: {
      backgroundColor: colors.NEUTRAL[50],
      marginTop: 20,
      paddingBottom: 10,
    },
    className: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.PRIMARY[900],
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    row: {
      marginVertical: 7,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    description: {
      fontSize: 16,
      fontWeight: '400',
      color: colors.text,
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
    highlight: {
      fontSize: 14,
      fontWeight: '400',
      textDecorationLine: 'underline',
      color: colors.SECONDARY[900],
      //textAlign: 'right',
    },
    button: {
      backgroundColor: colors.NEUTRAL[800],
      paddingVertical: 10,
      alignContent: 'center',
      marginHorizontal: hp(2),
      borderRadius: 15,
      marginTop: 20,
    },
    buttonTitle: {
      color: colors.SECONDARY[800],
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
  });
