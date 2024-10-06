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
import {useAuxios} from '@src/app/hook';
import {StatusCodes} from 'http-status-codes';
import {CLASS_STATUS} from '@constants/user';
import {Loading} from '@components/loading';
import {formatDateFromISO} from '@utils/input';

export const ChildClass = props => {
  const {childInfo} = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const {publicAxios, authAxios} = useAuxios();
  const isFocused = useIsFocused();

  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(1)); // Chọn chỉ mục đầu tiên mặc định

  const classOption = [
    translate('Classes coming soon'),
    translate('Classes is going on'),
    translate('Class is closed'),
  ];

  const [comingClass, setComingClass] = useState([]);
  const [openingClass, setOpeningClass] = useState([]);
  const [closedClass, setClosedClass] = useState([]);
  const [classes, setClasses] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    if (isFocused) {
      fetchClasses();
    }
  }, [isFocused]);

  useEffect(() => {
    if (selectedIndex && classes) {
      setClassData(
        classes.filter(item => item.status === selectedIndex.row + 1),
      );
    }
  }, [selectedIndex, classes]);

  const fetchClasses = async () => {
    try {
      const response = await authAxios.get(
        `api/class-by-parent/${childInfo.id}`,
      );
      if (response.status === StatusCodes.OK) {
        console.log('fetchClasses res  class :', response.data);
        const classesData = response.data;
        setClasses(classesData);

        setComingClass(
          classesData.filter(item => item.status === CLASS_STATUS.COMMING),
        );
        setOpeningClass(
          classesData.filter(item => item.status === CLASS_STATUS.OPENING),
        );
        setClosedClass(
          classesData.filter(item => item.status === CLASS_STATUS.CLOSED),
        );
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('fetchClasses error', error);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.navigate(SCREEN_NAME.DETAIL_STUDENT_CLASS, {
            payload: {
              classId: item.id,
              studentId: childInfo.id,
              childInfo: childInfo,
            },
          });
        }}>
        <View style={styles.rowItem}>
          <Text style={styles.idItem}>{item.code}</Text>
          {item.status === CLASS_STATUS.COMMING ? (
            <Text style={styles.descriptiopnItem}>
              {translate('Time')}: {formatDateFromISO(item.startAt)}
            </Text>
          ) : (
            <Text style={styles.descriptiopnItem}>
              {translate('Number of sessions')}: {item.teachedSession}{' '}
              {translate('sessions')}
            </Text>
          )}
        </View>
        <Text style={styles.nameItem}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  //   const keyExtractor = item => `${item?.label}`;

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <Text style={styles.descriptiopn}>
        {translate('Total number of class participants')}:{' '}
        {classes?.length || '0'} {translate('classes')}
      </Text>

      <Select
        selectedIndex={selectedIndex}
        onSelect={index => {
          setSelectedIndex(index);
        }}
        value={classOption[selectedIndex.row]}>
        {classOption.map((option, index) => (
          <SelectItem key={index} title={option} />
        ))}
      </Select>

      <View>
        <View style={{marginTop: 10}}>
          <View
            style={
              {
                //  maxHeight: hp(40),
              }
            }>
            <FlatList
              data={classData}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
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
      marginBottom: 5,
    },
    title: {
      fontSize: 18,
      fontWeight: '800',
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
  });
