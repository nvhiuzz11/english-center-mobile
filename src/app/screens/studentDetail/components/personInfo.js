import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {translate} from '@locales';
import {DropDownIcon} from '@assets/icons/dropDownIcon';
import {hp, wp} from '@utils/responsive';
import {SCREEN_NAME} from '@constants/navigation';
import {Avatar} from '@ui-kitten/components';
import {getAvatar, getGender} from '@utils/user';
import {ROLE} from '@constants/user';
import {formatDateFromISO} from '@utils/input';

export const PersonInfo = props => {
  const {childInfo} = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const [showCommingClass, setShowCommingClass] = useState(false);
  const [showOpeningClass, setShowOpeningClass] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Avatar
          size="large"
          source={getAvatar(ROLE.STUDENT, childInfo.gender)}
          style={styles.avatar}
        />
        <Text style={styles.name}>{childInfo.name}</Text>

        <View style={styles.row}>
          <Text style={styles.title}>ID: </Text>
          <Text style={styles.info}>{childInfo.id}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>{translate('Gender')}: </Text>
          <Text style={styles.info}>{getGender(childInfo.gender)}</Text>
          <Text style={[styles.title, {marginLeft: 50}]}>
            {translate('Age')}:{' '}
          </Text>
          <Text style={styles.info}>{childInfo.age}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>{translate('Date of birth')}: </Text>
          <Text style={styles.info}>
            {childInfo.birthday && formatDateFromISO(childInfo.birthday)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>{translate('Phone')}: </Text>
          <Text style={styles.info}>{childInfo.phone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>{translate('Address')}: </Text>
          <Text style={styles.info}>{childInfo.address}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>{translate('Email')}: </Text>
          <Text style={styles.info}>{childInfo.email}</Text>
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
    },
    containerInfo: {
      paddingHorizontal: wp(7),
      paddingVertical: 20,
      paddingBottom: 50,
      backgroundColor: colors.BACKGROUND_MODAL,
      borderRadius: 16,
      minHeight: hp(40),
      maxHeight: hp(80),
      marginTop: hp(5),
    },
    header: {
      fontSize: 21,
      fontWeight: '700',
      textAlign: 'center',
      color: colors.PRIMARY.text,
      marginTop: 5,
      marginBottom: 10,
    },
    closeBtn: {
      alignItems: 'flex-end',
    },
    title: {
      fontSize: 15,
      fontWeight: '500',
      marginLeft: 5,
      color: colors.text,
    },
    avatar: {
      width: 70,
      height: 70,
      alignSelf: 'center',
      marginTop: 20,
    },
    name: {
      fontSize: 18,
      fontWeight: '600',
      alignItems: 'center',
      textAlign: 'center',
      color: colors.text,
      marginTop: 5,
    },
    row: {
      flexDirection: 'row',
      marginVertical: 7,
    },
    title: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    info: {
      color: colors.text,
      fontSize: 16,
    },
  });
