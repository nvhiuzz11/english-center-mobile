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

export const ClosedClass = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigation.navigate(SCREEN_NAME.DETAIL_STUDENT_CLASS);
        }}>
        <View style={styles.rowItem}>
          <Text style={styles.idItem}>{'E07-L05-2024'}</Text>
          <Text style={styles.descriptiopnItem}>
            {translate('Number of sessions')}: 3 {translate('sessions')}
          </Text>
        </View>
        <Text style={styles.nameItem}>{'Lớp 2 - L01 năm 2024'}</Text>
      </TouchableOpacity>
    );
  };
  //   const keyExtractor = item => `${item?.label}`;

  return (
    <View style={styles.container}>
      <Text style={styles.descriptiopn}>
        {translate('Completed')}: {'3 classes'}
      </Text>

      <View>
        <View style={{marginTop: 10}}>
          <View
            style={
              {
                //  maxHeight: hp(40),
              }
            }>
            <FlatList
              data={[{}, {}, {}, {}, {}, {}, {}, {}, {}]}
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
