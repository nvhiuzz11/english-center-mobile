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
import {Header} from '@components/header';
import {SCREEN_NAME} from '@constants/navigation';
import {setThemeMode} from '@store/reducers/setting';
import {InputApp} from '@components/input';
import {SearchIcon} from '@assets/icons/searchIcon';
import {FilterHomeIcon} from '@assets/icons/filterHomeIcon';
import {translate} from '@locales';
import {DrawerLayout} from 'react-native-gesture-handler';
import {CheckBox, Datepicker} from '@ui-kitten/components';
import {DatePickerIcon} from '@assets/icons/datePickerIcon';
import {ATTENDANCE_TYPE} from '@constants/request';
import {StatusCodes} from 'http-status-codes';
import {useAuxios} from '@src/app/hook';
import {Loading} from '@components/loading';
import Toast from 'react-native-toast-message';
import {ModalDelete} from '@components/modalDelete';

export const AttendanceScreen = props => {
  const payload = props?.route?.params?.payload;

  const {type, classData, attendanceData} = payload;

  const students = classData?.students;
  const studentIds = attendanceData?.studentIds || [];

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const {publicAxios, authAxios} = useAuxios();

  const [isShowAttendance, setIsShowAttendance] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // const students = [
  //   {id: '001', name: 'Nguyễn Văn A'},
  //   {id: '002', name: 'Trần Thị B'},
  //   {id: '003', name: 'Lê Văn C'},
  // ];

  useEffect(() => {
    console.log('attendanceData', attendanceData);
    console.log('classData', classData);
    console.log('students', students);
    console.log('studentIds', studentIds);
    console.log('attendance', attendance);
    if (type === ATTENDANCE_TYPE.UPDATE) {
      setDate(new Date(attendanceData.date));
    }
  }, []);

  const [attendance, setAttendance] = useState(
    students.reduce((acc, student) => {
      acc[student.id] = studentIds.includes(student.id);
      return acc;
    }, {}),
  );

  const toggleAttendance = studentId => {
    setAttendance(prevAttendance => ({
      ...prevAttendance,
      [studentId]: !prevAttendance[studentId],
    }));
  };

  const getUpdatedStudentIds = () => {
    return Object.keys(attendance)
      .filter(studentId => attendance[studentId])
      .map(studentId => Number(studentId));
  };

  const onPressUpdate = async () => {
    setIsLoading(true);

    const updatedStudentIds = getUpdatedStudentIds();
    console.log('updatedStudentIds', updatedStudentIds);

    try {
      const res = await authAxios.put(`api/attendance/${attendanceData.id}`, {
        date: date.toISOString(),
        classId: classData.id,
        studentIds: updatedStudentIds,
      });
      if (res.status === StatusCodes.OK) {
        Toast.show({
          type: 'success',
          props: {
            title: translate('Update attendance successfully'),
          },
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log('update attendance  ~ error', error);
      setIsLoading(false);
      Toast.show({
        type: 'error',
        props: {
          title: translate('Update attendance failed'),
        },
      });
    }
  };

  const onPressAdd = async () => {
    setIsLoading(true);

    const updatedStudentIds = getUpdatedStudentIds();
    console.log('updatedStudentIds', updatedStudentIds);
    try {
      const res = await authAxios.post('api/attendance', {
        date: date.toISOString(),
        classId: classData.id,
        studentIds: updatedStudentIds,
      });
      if (res.status === StatusCodes.OK) {
        Toast.show({
          type: 'success',
          props: {
            title: translate('Added attendance successfully'),
          },
        });
        setIsLoading(false);
        navigation.goBack();
      }
    } catch (error) {
      console.log('add attendance  ~ error', error);
      setIsLoading(false);
      Toast.show({
        type: 'error',
        props: {
          title: translate('Add attendance failed'),
        },
      });
    }
  };

  const deleteAttendance = async () => {
    setIsVisible(false);
    setIsLoading(true);

    try {
      const res = await authAxios.delete(`api/attendance/${attendanceData.id}`);
      if (res.status === StatusCodes.OK) {
        Toast.show({
          type: 'success',
          props: {
            title: translate('Delete attendance successfully'),
          },
        });
        setIsLoading(false);
        navigation.goBack();
      }
    } catch (error) {
      console.log('delete attendance  ~ error', error);
      setIsLoading(false);
      Toast.show({
        type: 'error',
        props: {
          title: translate('Delete attendance failed'),
        },
      });
    }
  };

  const onPressDelete = () => {
    setIsVisible(true);
  };

  const renderHeader = () => (
    <View style={styles.row}>
      <Text style={[styles.headerCell, {flex: 1}]}>STT</Text>
      <Text style={[styles.headerCell, {flex: 1}]}>ID</Text>
      <Text style={styles.headerCell}>{translate('Fullname')}</Text>
      <Text style={styles.headerCell}>{translate('Attendance')}</Text>
    </View>
  );

  const renderItem = ({item, index}) => (
    <View style={styles.row}>
      <Text style={[styles.cell, {flex: 1}]}>{index + 1}</Text>
      <Text style={[styles.cell, {flex: 1}]}>{item.id}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <View style={[styles.cell, {alignItems: 'center'}]}>
        <CheckBox
          checked={attendance[item.id]}
          value={attendance[item.id]}
          onChange={() => toggleAttendance(item.id)}
        />
      </View>
    </View>
  );

  return (
    <Container>
      {isLoading && <Loading />}
      <Header title={translate('Attendance')} />

      <View style={styles.container}>
        <View style={{marginHorizontal: wp(2), marginBottom: 20}}>
          <Text style={styles.label}>{translate('Time')}</Text>
          <Datepicker
            style={{color: 'black'}}
            date={date}
            max={new Date(2055, 0, 1)}
            min={new Date(1900, 0, 1)}
            onSelect={nextDate => setDate(nextDate)}
            placeholder={translate('Select date')}
            accessoryRight={<DatePickerIcon />}
          />
        </View>

        {renderHeader()}
        <FlatList
          data={students}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

        {type === ATTENDANCE_TYPE.ADD ? (
          <TouchableOpacity style={styles.addButton} onPress={onPressAdd}>
            <Text style={styles.titleButton}>{translate('Add')}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={onPressDelete}>
              <Text style={styles.titleButton}>{translate('Delete')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={onPressUpdate}>
              <Text style={styles.titleButton}>{translate('Update')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ModalDelete
        isVisible={isVisible}
        onClose={() => {
          setIsVisible(false);
        }}
        onDelete={deleteAttendance}
        onCancle={() => {
          setIsVisible(false);
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
      paddingTop: 20,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderColor: colors.PRIMARY[500],
    },
    headerCell: {
      fontWeight: 'bold',
      flex: 2,
      textAlign: 'center',
      color: colors.text,
    },
    cell: {
      flex: 2,
      textAlign: 'center',
      color: colors.text,
    },
    label: {
      color: colors.text,
      fontWeight: '500',
      fontSize: 14,
      marginBottom: 5,
    },
    addButton: {
      backgroundColor: colors.SEMANTIC.SUCCESS[500],
      paddingVertical: 10,
      alignItems: 'center',
      marginVertical: 5,
      borderRadius: 15,
      marginVertical: wp(2),
      paddingHorizontal: wp(5),
    },
    updateButton: {
      backgroundColor: colors.SEMANTIC.SUCCESS[500],
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 15,
      paddingHorizontal: wp(5),
      marginHorizontal: wp(2),
      flex: 1,
    },
    deleteButton: {
      backgroundColor: colors.SEMANTIC.ERROR[500],
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 15,
      marginHorizontal: wp(2),
      paddingHorizontal: wp(5),
      flex: 1,
    },
    titleButton: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    buttonContainer: {
      flexDirection: 'row',
      marginVertical: 7,
    },
  });
