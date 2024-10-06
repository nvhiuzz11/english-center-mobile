import React, {useEffect, useRef, useState} from 'react';
import {Container} from '@components/container';
import {useIsFocused, useNavigation, useTheme} from '@react-navigation/native';
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
import {Header} from '@components/header';
import {SCREEN_NAME} from '@constants/navigation';
import {setThemeMode} from '@store/reducers/setting';
import {InputApp} from '@components/input';
import {SearchIcon} from '@assets/icons/searchIcon';
import {FilterHomeIcon} from '@assets/icons/filterHomeIcon';
import {translate} from '@locales';
import {DrawerLayout} from 'react-native-gesture-handler';
import {useAuxios} from '@src/app/hook';
import {formatDateFromISO, formatMoney} from '@utils/input';
import {Loading} from '@components/loading';
import {CLASS_STATUS} from '@constants/user';

export const DetailTeacherClassScreen = props => {
  const {classData} = props.route.params.payload;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const {publicAxios, authAxios} = useAuxios();
  const isFocused = useIsFocused();

  const [isShowAttendance, setIsShowAttendance] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [classInfo, setClassInfo] = useState(null);

  useEffect(() => {
    if (isFocused) {
      fetchClasses();
    }
  }, [isFocused]);

  const fetchClasses = async () => {
    try {
      const response = await publicAxios.get(`api/class/${classData.id}`, {
        params: {
          includeTeacher: true,
          includeCenter: true,
          includeProgram: true,
          includeSchedule: true,
        },
      });
      console.log('fetchClasses detail res :', response.data);
      setClassInfo(response.data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('fetchClasses detail error', error);
    }
  };

  const onPressContent = () => {
    navigation.navigate(SCREEN_NAME.CONTENT_OF_SESSIONS, {
      payload: {classData: classData},
    });
  };

  const onPressStudentList = () => {
    navigation.navigate(SCREEN_NAME.STUDENT_OF_CLASS, {
      payload: {
        listStudent: classData.students,
        attendances: classData.attendances,
      },
    });
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
                {translate('Age')}:{' '}
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
              <View style={{marginLeft: 10}}>
                {classInfo.schedules.map((schedule, index) => (
                  <Text key={index} style={styles.description}>
                    {schedule.dayLabel} - {schedule.startAt}-{schedule.endAt}
                  </Text>
                ))}
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.title}>
                {translate('Wage')}:{'   '}
                <Text style={styles.description}>
                  {formatMoney(classData.salary)} {'VND'} {'/'}{' '}
                  {translate('sessions')}
                </Text>
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>
                {translate('Center')}:{'   '}
                <Text style={styles.description}>
                  {translate('Center')} {classInfo.center.id}-
                  {classInfo.center.name}
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={onPressStudentList}>
              <Text style={styles.buttonTitle}>
                {translate('List of students')}
              </Text>
            </TouchableOpacity>
            {classData.status !== CLASS_STATUS.COMMING && (
              <TouchableOpacity style={styles.button} onPress={onPressContent}>
                <Text style={styles.buttonTitle}>
                  {translate('Content of sessions')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      )}
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
