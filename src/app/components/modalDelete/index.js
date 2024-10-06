import React from 'react';

import {useTheme} from '@react-navigation/native';
import {Avatar, Layout, Modal} from '@ui-kitten/components';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {hp, wp} from '@utils/responsive';
import {translate} from '@locales';
import {CloseIcon} from '@assets/icons/closeIcon';
import {WarningIcon} from '@assets/icons/warningIcon';

export const ModalDelete = props => {
  const {isVisible, onClose, onDelete, onCancle} = props;
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
        <View style={styles.headerContainer}>
          <WarningIcon />
          <Text style={styles.header}>
            {translate('Are you sure you want to delete?')}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancle}>
            <Text style={styles.buttonTitle}>{translate('Cancle')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.buttonTitle}>{translate('Delete')}</Text>
          </TouchableOpacity>
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
      width: wp(75),
      backgroundColor: colors.BACKGROUND_MODAL,
      borderRadius: 16,
      minHeight: hp(30),
      maxHeight: hp(80),
    },
    header: {
      fontSize: 21,
      fontWeight: '700',
      textAlign: 'center',
      color: colors.PRIMARY.text,
      marginLeft: 5,
    },
    headerContainer: {
      /// flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    closeBtn: {
      alignItems: 'flex-end',
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 30,
    },
    deleteButton: {
      flex: 1,
      paddingVertical: 10,
      backgroundColor: colors.SECONDARY[600],
      alignItems: 'center',
      borderRadius: 10,
      marginHorizontal: 5,
    },
    cancelButton: {
      flex: 1,
      paddingVertical: 10,
      backgroundColor: colors.SECONDARY[300],
      alignItems: 'center',
      borderRadius: 10,
      marginHorizontal: 5,
    },
    buttonTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
    },
  });
