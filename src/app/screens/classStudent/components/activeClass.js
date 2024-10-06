import React, {useEffect, useState, useMemo} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {translate} from '@locales';
import {DropDownIcon} from '@assets/icons/dropDownIcon';
import {wp} from '@utils/responsive';
import {SCREEN_NAME} from '@constants/navigation';
import {formatDateFromISO} from '@utils/input';
import {CLASS_STATUS} from '@constants/user';

export const ActiveClass = props => {
  const {comingClass, openingClass} = props;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const {accountInfo} = useSelector(state => state.account);

  const [showCommingClass, setShowCommingClass] = useState(false);
  const [showOpeningClass, setShowOpeningClass] = useState(true);

  const toggleComingClass = () => {
    setShowCommingClass(!showCommingClass);
  };

  const toggleOpeningClass = () => {
    setShowOpeningClass(!showOpeningClass);
  };

  const dataClass = useMemo(
    () => [
      {
        data: comingClass,
        key: 'upcoming',
        title: translate('Classes coming soon'),
        show: showCommingClass,
        onPress: toggleComingClass,
      },
      {
        data: openingClass,
        key: 'ongoing',
        title: translate('Classes is going on'),
        show: showOpeningClass,
        onPress: toggleOpeningClass,
      },
    ],
    [comingClass, openingClass, showCommingClass, showOpeningClass],
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate(SCREEN_NAME.DETAIL_STUDENT_CLASS, {
          payload: {
            classId: item.id,
            studentId: accountInfo.student.id,
            childInfo: [],
          },
        });
      }}>
      <View style={styles.rowItem}>
        <Text style={styles.idItem}>{item?.code}</Text>
        {item.status === CLASS_STATUS.COMMING ? (
          <Text style={styles.descriptionItem}>
            {translate('Time')}: {formatDateFromISO(item.startAt)}
          </Text>
        ) : (
          <Text style={styles.descriptionItem}>
            {translate('Number of sessions')}: {item?.teachedSession}{' '}
            {translate('sessions')}
          </Text>
        )}
      </View>
      <Text style={styles.nameItem}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderList = ({item}) => (
    <View style={{marginTop: 10}}>
      <TouchableOpacity style={styles.dropButton} onPress={item.onPress}>
        <Text style={styles.title}>{item.title}</Text>
        <DropDownIcon
          style={!item.show && {transform: [{rotate: '180deg'}]}}
          color={colors.text}
        />
      </TouchableOpacity>
      {item.show && (
        <FlatList
          data={item.data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );

  return (
    <View style={{flex: 1, marginTop: 10}}>
      <Text style={styles.description}>
        {translate('Currently participating')}:{' '}
        {comingClass.length + openingClass.length} {translate('classes')}
      </Text>
      <FlatList
        style={styles.container}
        data={dataClass}
        renderItem={renderList}
        keyExtractor={item => item.key}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: wp(3),
    },
    dropButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    description: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
      fontStyle: 'italic',
      marginLeft: wp(3),
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
    idItem: {color: colors.text, fontSize: 15, fontWeight: '600'},
    nameItem: {color: colors.text, fontSize: 14, marginTop: 5},
    descriptionItem: {color: colors.text},
  });
