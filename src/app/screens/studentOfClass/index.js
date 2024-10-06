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
import {formatDateFromISO} from '@utils/input';

export const StudentOfClassScreen = props => {
  const {listStudent, attendances} = props.route.params.payload;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [students, setStudent] = useState([]);

  const [isShowAttendance, setIsShowAttendance] = useState(false);

  const onPressContent = () => {
    navigation.navigate(SCREEN_NAME.SESSION_CONTENT);
  };

  useEffect(() => {
    listStudent.forEach(student => {
      student.attendanceCount = 0;
      student.absenceCount = 0;
    });

    attendances.forEach(attendance => {
      listStudent.forEach(student => {
        if (attendance.studentIds.includes(student.id)) {
          student.attendanceCount += 1;
        } else {
          student.absenceCount += 1;
        }
      });
    });

    setStudent(listStudent);
  }, [listStudent]);

  const renderHeader = () => (
    <View style={styles.row}>
      <Text style={[styles.headerCell, {flex: 1}]}>STT</Text>
      <Text style={[styles.headerCell, {flex: 1}]}>ID</Text>
      <Text style={styles.headerCell}>{translate('Fullname')}</Text>
      <Text style={styles.headerCell}>{translate('Date of birth')}</Text>
      {/* <Text style={styles.headerCell}>Giới tính</Text> */}
      <Text style={styles.headerCell}>{translate('Number of session')}</Text>
    </View>
  );

  const renderItem = ({item, index}) => (
    <View style={styles.row}>
      <Text style={[styles.cell, {flex: 1}]}>{index + 1}</Text>
      <Text style={[styles.cell, {flex: 1}]}>{item.id}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>
        {/* {item.birthday && formatDateFromISO(item.birthday)} */}
        {formatDateFromISO(item.birthday)}
      </Text>

      <Text style={styles.cell}>
        {item.attendanceCount} / {attendances.length}
      </Text>
    </View>
  );

  return (
    <Container>
      <Header title={translate('List of students')} />
      <View style={styles.container}>
        {renderHeader()}
        <FlatList
          data={students}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
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
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderColor: '#ddd',
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
  });
