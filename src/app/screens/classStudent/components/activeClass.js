import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {translate} from '@locales';
import {DropDownIcon} from '@assets/icons/dropDownIcon';
import {wp} from '@utils/responsive';
import {SCREEN_NAME} from '@constants/navigation';

export const ActiveClass = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const [showCommingClass, setShowCommingClass] = useState(false);
  const [showOpeningClass, setShowOpeningClass] = useState(true);

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate(SCREEN_NAME.DETAIL_STUDENT_CLASS);
      }}>
      <View style={styles.rowItem}>
        <Text style={styles.idItem}>{'E07-L05-2024'}</Text>
        <Text style={styles.descriptionItem}>
          {translate('Time')}: 3-12-2022
        </Text>
      </View>
      <Text style={styles.nameItem}>{'Lớp 2 - L01 năm 2024'}</Text>
    </TouchableOpacity>
  );

  const data = [
    {
      key: 'upcoming',
      title: translate('Classes coming soon'),
      show: showCommingClass,
      onPress: () => setShowCommingClass(!showCommingClass),
    },
    {
      key: 'ongoing',
      title: translate('Classes is going on'),
      show: showOpeningClass,
      onPress: () => setShowOpeningClass(!showOpeningClass),
    },
  ];

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
          data={[{}, {}, {}, {}, {}, {}, {}, {}, {}]}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );

  return (
    <View style={{flex: 1, marginTop: 10}}>
      <Text style={styles.description}>
        {translate('Currently participating')}: {'3 classes'}
      </Text>
      <FlatList
        style={styles.container}
        data={data}
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
