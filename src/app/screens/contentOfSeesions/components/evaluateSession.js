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
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MainHeader} from '@components/mainHeader';
import {hp, wp} from '@utils/responsive';
import {CourseItem} from './components/courseItem';
import {Header} from '@components/header';
import {ROUTES_STUDENT_CLASS, SCREEN_NAME} from '@constants/navigation';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {translate} from '@locales';
import {DropDownIcon} from '@assets/icons/dropDownIcon';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {IndexPath, Select, SelectItem} from '@ui-kitten/components';
import {ATTENDANCE_TYPE, EVALUATE_TYPE} from '@constants/request';
import {useAuxios} from '@src/app/hook';
import {StatusCodes} from 'http-status-codes';
import {formatDateFromISO} from '@utils/input';
import {Loading} from '@components/loading';

export const EvaluateSession = props => {
  const {classData} = props;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const {publicAxios, authAxios} = useAuxios();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);

  const [listReview, setListReview] = useState(null);
  const [listAttendance, setListAttendance] = useState(null);

  useEffect(() => {
    if (isFocused) {
      fetchReview();
      // fetchAttendance();
    }
  }, [isFocused]);

  const fetchReview = async () => {
    try {
      const response = await authAxios.get('api/review-by-teacher', {
        params: {classId: classData.id},
      });
      if (response.status === StatusCodes.OK) {
        console.log('fetchReview res  :', response.data);
        const docs = response.data.docs;
        docs.sort((a, b) => new Date(b.date) - new Date(a.date));
        setListAttendance(docs);

        const data = docs.filter(doc => doc.reviews.length > 0);
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log('data', data);

        setListReview(data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('fetchReview error', error);
    }
  };

  // const fetchAttendance = async () => {
  //   try {
  //     const response = await authAxios.get('api/attendances', {
  //       params: {classId: classData.id},
  //     });
  //     if (response.status === StatusCodes.OK) {
  //       console.log('fetchAttendance res  :', response.data);
  //       const data = response.data;
  //       data.sort((a, b) => new Date(b.date) - new Date(a.date));
  //       console.log('data', data);

  //       setListAttendance(data);
  //     }
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error('fetchAttendance error', error);
  //   }
  // };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.navigate(SCREEN_NAME.EVALUATE_SESSION, {
            payload: {
              type: EVALUATE_TYPE.UPDATE,
              classData: classData,
              reivewData: item.reviews,
              attendanceData: item,
            },
          });
        }}>
        {/* <Text style={styles.idItem}>{item.reviews[0].title}</Text> */}
        <View style={styles.rowItem}>
          {/* <Text style={styles.descriptiopnItem}>{translate('Session')}: 3</Text> */}
        </View>
        {item?.reviews?.length > 0 ? (
          <Text style={styles.idItem}>{item.reviews[0].title}</Text>
        ) : (
          <Text style={styles.idItem}>
            {'Đánh giá buổi học '}
            {formatDateFromISO(item.date)}
          </Text>
        )}
        <Text style={styles.descriptiopnItem}>
          {translate('Date')}: {formatDateFromISO(item.date)}
        </Text>
      </TouchableOpacity>
    );
  };
  //   const keyExtractor = item => `${item?.label}`;

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}>
        <Text style={styles.header}>
          {translate('Class')}:{' '}
          <Text style={{fontWeight: '400'}}>{classData.code}</Text>
        </Text>
        <Text style={styles.header}>
          {translate('Total')}:{' '}
          <Text style={{fontWeight: '400'}}>
            {listAttendance && listAttendance.length} {translate('sessions')}
          </Text>
        </Text>
      </View>

      <FlatList
        data={listAttendance}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate(SCREEN_NAME.EVALUATE_SESSION, {
            payload: {
              type: EVALUATE_TYPE.ADD,
              classData: classData,
              reivewData: [],
            },
          });
        }}>
        <Text style={styles.buttonTitle}>{translate('Add evaluate')}</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: wp(3),
      marginTop: 10,
    },
    dropButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    descriptiopn: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
      fontStyle: 'italic',
    },
    title: {
      fontSize: 18,
      fontWeight: '800',
      color: colors.text,
    },
    header: {
      fontSize: 17,
      fontWeight: '700',
      color: colors.text,
    },
    itemContainer: {
      backgroundColor: colors.SECONDARY[400],
      marginVertical: 7,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 15,
    },
    rowItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    titleItem: {
      color: colors.text,
    },
    idItem: {color: colors.text, fontSize: 15, fontWeight: '600'},
    nameItem: {color: colors.text, fontSize: 14, marginTop: 5},
    descriptiopnItem: {color: colors.text},
    button: {
      backgroundColor: colors.SEMANTIC.SUCCESS[500],
      paddingVertical: 15,
      alignItems: 'center',
      marginVertical: 5,
      borderRadius: 15,
      marginVertical: wp(2),
      paddingHorizontal: wp(5),
    },
    buttonTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
  });
