import React, {useRef, useState} from 'react';
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

export const DetailStudentClassScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const [isShowAttendance, setIsShowAttendance] = useState(false);

  return (
    <Container>
      <Header title={translate('Detail class')} />
      <ScrollView style={styles.container}>
        <View style={styles.detailContainer}>
          <Text style={styles.className}>{'Lớp 2 - L01 năm 2024'}</Text>
          <View style={styles.row}>
            <Text style={styles.title}>
              {translate('Class ID')}:{'   '}
              <Text style={styles.description}>{'E02-L01-2024'}</Text>
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>
              {translate('Age')}: <Text style={styles.description}>{'3'}</Text>
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.title}>
              {translate('Number of students')}:{'   '}
              <Text style={styles.description}>
                {'3'} {translate('students')}
              </Text>
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>
              {translate('Time start')}:{'   '}
              <Text style={styles.description}>{'2/2/2222'}</Text>
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.title}>
              {translate('Number of sessions held')}:{'   '}
              <Text style={styles.description}>
                {'3/3'} {translate('sessions')}
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
              <Text style={styles.description}>{'2/2/2222'}</Text>
              <Text style={styles.description}>{'2/2/2222'}</Text>
              <Text style={styles.description}>{'2/2/2222'}</Text>
              <Text style={styles.description}>{'2/2/2222'}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>
              {translate('Number of absent sessions')}:{'   '}
              <Text style={styles.description}>
                {'5'} {translate('sessions')}
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
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>
              {translate('Tuition fee')}:{'   '}
              <Text style={styles.description}>{'500.000d'}</Text>
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>
              {translate('Tuition reduction')}:{'   '}
              <Text style={styles.description}>{'5%'}</Text>
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>
              {translate('Center')}:{'   '}
              <Text style={styles.description}>{'A s sasa'}</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
      <ModalAttendance
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
  });
