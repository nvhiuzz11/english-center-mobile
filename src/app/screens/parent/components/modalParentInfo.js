import React from 'react';

import {useTheme} from '@react-navigation/native';
import {Avatar, Layout, Modal} from '@ui-kitten/components';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {hp, wp} from '@utils/responsive';
import {translate} from '@locales';
import {CloseIcon} from '@assets/icons/closeIcon';
import {getAvatar, getGender} from '@utils/user';
import {ROLE} from '@constants/user';
import {formatDateFromISO} from '@utils/input';

export const ModalParentInfo = props => {
  const {isVisible, onClose, info} = props;
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  return (
    <Modal
      visible={isVisible}
      backdropStyle={styles.backdrop}
      animationType="fade">
      <Layout style={styles.container}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <CloseIcon />
        </TouchableOpacity>
        <Text style={styles.header}>{translate('Parent Information')}</Text>
        <View>
          <Avatar
            size="large"
            source={getAvatar(ROLE.PARENT, info?.gender)}
            style={styles.avatar}
          />
          <Text style={styles.name}>{info?.name}</Text>
          <View>
            <View style={styles.row}>
              <Text style={styles.title}>ID: </Text>
              <Text style={styles.info}>{info?.id}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>{translate('Gender')}: </Text>
              <Text style={styles.info}>{getGender(info?.gender)}</Text>
              <Text style={[styles.title, {marginLeft: 50}]}>
                {translate('Age')}:{' '}
              </Text>
              <Text style={styles.info}>{info?.age}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>{translate('Date of birth')}: </Text>
              <Text style={styles.info}>
                {info?.birthday && formatDateFromISO(info?.birthday)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>{translate('Phone')}: </Text>
              <Text style={styles.info}>{info?.phone}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>{translate('Address')}: </Text>
              <Text style={styles.info}>{info?.address}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>{translate('Email')}: </Text>
              <Text style={styles.info}>{info?.email}</Text>
            </View>
          </View>
        </View>
      </Layout>
    </Modal>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
      paddingHorizontal: wp(7),
      paddingVertical: 20,
      paddingBottom: 50,
      width: wp(85),
      backgroundColor: colors.BACKGROUND_MODAL,
      borderRadius: 16,
      minHeight: hp(40),
      maxHeight: hp(80),
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
