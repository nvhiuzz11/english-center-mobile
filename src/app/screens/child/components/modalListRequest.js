import React from 'react';

import {useTheme} from '@react-navigation/native';
import {Avatar, Layout, Modal} from '@ui-kitten/components';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {hp, wp} from '@utils/responsive';
import {translate} from '@locales';
import {CloseIcon} from '@assets/icons/closeIcon';
import {REQUEST_TYPE} from '@constants/request';

export const ModalListRequest = props => {
  const {
    isVisible,
    onClose,
    type,
    listRequestSend,
    listRequestReceive,
    onRefuse,
    onAccept,
  } = props;

  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const renderSendItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.row}>
          <View>
            <View style={styles.row}>
              <Text style={styles.title}>ID: </Text>
              <Text style={styles.info}>{item.studentId}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>{translate('Name')}: </Text>
              <Text style={styles.info}>{item.studentId}</Text>
            </View>
          </View>
          {/* <Text style={styles.info}>
          {translate('request has been sent')} ...
        </Text> */}
        </View>
      </View>
    );
  };

  const renderReceiveItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.row}>
          <View>
            <View style={styles.row}>
              <Text style={styles.title}>ID: </Text>
              <Text style={styles.info}>{item.studentId}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>{translate('Name')}: </Text>
              <Text style={styles.info}>{item.requestUser?.name}</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.refuseButton}
            onPress={() => {
              onRefuse(item.id);
            }}>
            <Text style={styles.buttonTitle}>{translate('Refuse')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => {
              onAccept(item.id);
            }}>
            <Text style={styles.buttonTitle}>{translate('Accept')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={isVisible}
      backdropStyle={styles.backdrop}
      animationType="slide">
      <Layout style={styles.container}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <CloseIcon />
        </TouchableOpacity>
        <Text style={styles.header}>
          {type === REQUEST_TYPE.SEND
            ? translate('List of sent requests')
            : translate('List of receive requests')}
        </Text>
        {type === REQUEST_TYPE.SEND ? (
          <FlatList
            data={listRequestSend}
            renderItem={renderSendItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
          />
        ) : (
          <FlatList
            keyExtractor={item => item.id}
            data={listRequestReceive}
            renderItem={renderReceiveItem}
            showsVerticalScrollIndicator={false}
          />
        )}
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
      paddingVertical: 25,
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
    row: {
      flexDirection: 'row',
      //  / marginVertical: 7,
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
    itemContainer: {
      backgroundColor: colors.SECONDARY[300],
      marginVertical: 7,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 15,
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    acceptButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 5,
      backgroundColor: colors.SEMANTIC.SUCCESS[600],
      marginHorizontal: 5,
      borderRadius: 5,
    },
    refuseButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 5,
      backgroundColor: colors.SEMANTIC.ERROR[500],
      marginHorizontal: 5,
      borderRadius: 5,
    },
    buttonTitle: {
      color: colors.text,
    },
  });
