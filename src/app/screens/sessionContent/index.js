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
import {formatDateFromISO} from '@utils/input';

export const SessionContentScreen = props => {
  const {listAttendance, classInfo, childInfo} = props.route.params.payload;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.navigate(SCREEN_NAME.SESSION_CONTENT_DETAIL, {
            payload: {
              attendanceData: item,
            },
          });
        }}>
        {item?.generalReview ? (
          <Text style={styles.idItem}>{item.generalReview.title}</Text>
        ) : (
          <Text style={styles.idItem}>
            {'Đánh giá buổi học '}
            {formatDateFromISO(item.date)}
          </Text>
        )}
        <View style={styles.rowItem}>
          <Text style={styles.nameItem}>
            {translate('Date')}: {formatDateFromISO(item.date)}
          </Text>
          {/* <Text style={styles.descriptiopnItem}>{translate('Session')}: 3</Text> */}
        </View>
      </TouchableOpacity>
    );
  };
  //   const keyExtractor = item => `${item?.label}`;

  return (
    <Container>
      <Header title={translate('Content of sessions')} />
      <View style={styles.container}>
        <Text style={styles.header}>
          {translate('Class')}:{' '}
          <Text style={{fontWeight: '400'}}>{classInfo.code}</Text>
        </Text>
        <Text style={styles.header}>
          {translate('Student')}:{' '}
          <Text style={{fontWeight: '400'}}>{childInfo.name}</Text>
        </Text>
        <View style={{marginTop: 10, flex: 1}}>
          <FlatList
            data={listAttendance}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </Container>
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
      marginLeft: 15,
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
