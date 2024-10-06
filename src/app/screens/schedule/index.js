import React, {useEffect, useState} from 'react';
import {Container} from '@components/container';
import {useIsFocused, useNavigation, useTheme} from '@react-navigation/native';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MainHeader} from '@components/mainHeader';
import {hp, wp} from '@utils/responsive';
import {DropDownIcon} from '@assets/icons/dropDownIcon';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {useAuxios} from '@src/app/hook';
import {Loading} from '@components/loading';
import {StatusCodes} from 'http-status-codes';
import {isStudent} from '@utils/user';
import {translate} from '@locales';
import {formatDateTMDToDMY} from '@utils/input';

export const ScheduleScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const {accountInfo} = useSelector(state => state.account);
  const {language} = useSelector(state => state.settings);
  const {authAxios} = useAuxios();
  const isFocused = useIsFocused();

  const [selectedDay, setSelectedDay] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [scheduleData, setScheduleData] = useState(null);
  const [schedules, setSchedules] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (scheduleData) {
      assignColors(scheduleData);
    }
  }, [scheduleData]);

  useEffect(() => {
    if (schedules) {
      const day = new Date();
      day.setDate(day.getDate() + 1);
      const today = day.toISOString().split('T')[0];
      setSelectedDay(today);
      setSchedule(schedules[today]);
    }
  }, [schedules]);

  useEffect(() => {
    if (isFocused) {
      fetchSchedule();
    }
  }, [isFocused]);

  const fetchSchedule = async () => {
    try {
      const response = isStudent(accountInfo.role)
        ? await authAxios.get('api/my-schedule')
        : await authAxios.get('api/my-schedule-by-teacher');

      if (response.status === StatusCodes.OK) {
        const result = response.data.reduce((acc, obj) => {
          const key = Object.keys(obj)[0];
          acc[key] = obj[key];
          return acc;
        }, {});

        setSchedules(result);
        setScheduleData(response.data);
      }
    } catch (error) {
      console.error('fetchSchedule error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const colorss = [
    'red',
    'green',
    'blue',
    'yellow',
    'purple',
    'orange',
    'cyan',
    'magenta',
    'lime',
    'pink',
    'teal',
    'lavender',
    'brown',
    'beige',
    'maroon',
    'mint',
    'olive',
    'coral',
    'navy',
    'grey',
    'white',
    'black',
    'gold',
    'silver',
    'bronze',
    'violet',
    'indigo',
    'turquoise',
    'peach',
    'salmon',
    'plum',
    'crimson',
    'khaki',
    'orchid',
  ];

  const classColors = {};

  const assignColors = schedule => {
    schedule.forEach(day => {
      Object.keys(day).forEach(date => {
        day[date].forEach(classItem => {
          if (!classColors[classItem.classID]) {
            const colorIndex = Object.keys(classColors).length % colorss.length;
            classColors[classItem.classID] = colorss[colorIndex];
          }
          classItem.color = classColors[classItem.classID];
        });
      });
    });
  };

  LocaleConfig.locales['vi'] = {
    monthNames: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    monthNamesShort: [
      'T1',
      'T2',
      'T3',
      'T4',
      'T5',
      'T6',
      'T7',
      'T8',
      'T9',
      'T10',
      'T11',
      'T12',
    ],
    dayNames: [
      'Chủ Nhật',
      'Thứ Hai',
      'Thứ Ba',
      'Thứ Tư',
      'Thứ Năm',
      'Thứ Sáu',
      'Thứ Bảy',
    ],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  };

  LocaleConfig.defaultLocale = language;

  const getMarkedDates = () => {
    const markedDates = {};

    scheduleData.forEach(item => {
      const date = Object.keys(item)[0];
      const classes = item[date];

      const dots = classes.map(cls => ({
        key: cls.classID,
        color: cls.color,
      }));

      markedDates[date] = {dots};
    });

    if (selectedDay) {
      markedDates[selectedDay] = {
        ...markedDates[selectedDay],
        selected: true,
        selectedColor: colors.SECONDARY[700],
      };
    }

    return markedDates;
  };
  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.leftContainer}>
        <Text style={styles.time}>{item.startAt}</Text>
        <DropDownIcon size={12} />
        <Text style={styles.time}>{item.endAt}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.classID}>{item.classID}</Text>
        <Text style={styles.className}>({item.className})</Text>
        <Text style={styles.center}>{item.centerName}</Text>
      </View>
    </View>
  );

  const onDayPress = day => {
    setSchedule(schedules[day.dateString] || []);
    setSelectedDay(day.dateString);
  };

  return (
    <Container>
      {isLoading && <Loading />}
      <MainHeader />
      <View style={styles.container}>
        <Calendar
          onDayPress={onDayPress}
          markedDates={scheduleData && getMarkedDates()}
          markingType={'multi-dot'}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#f0f0f0',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#ff6347',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: '#00adf5',
            monthTextColor: '#00adf5',
            indicatorColor: 'blue',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: '500',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 16,
          }}
          firstDay={1}
        />

        <View style={styles.scheduleContainer}>
          {selectedDay && (
            <>
              <Text style={styles.header}>
                {translate('Class schedule for')}{' '}
                {formatDateTMDToDMY(selectedDay)}
              </Text>

              {schedule ? (
                <FlatList
                  data={schedule}
                  keyExtractor={(item, index) => `${item.classID}-${index}`}
                  renderItem={renderItem}
                />
              ) : (
                <Text style={styles.noClassText}>
                  {translate('There is no class schedule for this day')}.
                </Text>
              )}
            </>
          )}
        </View>
      </View>
    </Container>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scheduleContainer: {
      backgroundColor: colors.SECONDARY[500],
      padding: wp(5),
      marginHorizontal: wp(5),
      borderRadius: 15,
      flex: 1,
    },
    header: {
      fontSize: 18,
      color: colors.text,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 15,
    },
    noClassText: {
      color: colors.text,
      marginLeft: 10,
      fontSize: 15,
    },
    itemContainer: {
      flexDirection: 'row',
      marginVertical: 10,
    },
    leftContainer: {
      flex: 1,
      alignItems: 'center',
      borderRightWidth: 1,
      borderRightColor: colors.text,
      marginRight: 10,
    },
    rightContainer: {
      flex: 3,
    },
    time: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    classID: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    className: {
      fontSize: 14,
      color: colors.text,
    },
    center: {
      fontSize: 12,
      color: colors.text,
    },
  });
