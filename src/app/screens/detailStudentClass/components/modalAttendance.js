import React from 'react';

import {useTheme} from '@react-navigation/native';
import {Layout, Modal} from '@ui-kitten/components';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {hp, wp} from '@utils/responsive';
import {translate} from '@locales';
import {CloseIcon} from '@assets/icons/closeIcon';
import {LoginIcon} from '@assets/icons/loginIcon';
import {NoIcon} from '@assets/icons/noIcon';
import {YesIcon} from '@assets/icons/yesIcon';

export const ModalAttendance = props => {
  const {isVisible, onClose} = props;
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const renderItem = ({item, index}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{'1-2-3222'}</Text>
      <NoIcon style={{marginRight: 5}} />
      {/* <YesIcon /> */}
    </View>
  );

  return (
    <Modal
      visible={isVisible}
      backdropStyle={styles.backdrop}
      animationType="fade">
      <Layout style={styles.container}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <CloseIcon />
        </TouchableOpacity>
        <Text style={styles.header}>{'Attendance Detail'}</Text>
        <View style={styles.item}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: '700',
              color: colors.PRIMARY[900],
              marginLeft: 5,
            }}>
            {'Date'}
          </Text>
        </View>
        <FlatList
          data={[
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            ,
            {},
            {},
            {},
            ,
            {},
            {},
            {},
            ,
            {},
            {},
            {},
            ,
            {},
            {},
            {},
            {},
            {},
            {},
            ,
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            ,
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ]}
          renderItem={renderItem}
        />
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
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      paddingVertical: 5,
      borderColor: colors.PRIMARY[500],
    },
    title: {
      fontSize: 15,
      fontWeight: '500',
      marginLeft: 5,
      color: colors.text,
    },
  });
