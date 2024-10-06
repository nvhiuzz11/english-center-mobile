import React from 'react';

import {useTheme} from '@react-navigation/native';
import {Avatar, Layout, Modal} from '@ui-kitten/components';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {wp} from '@utils/responsive';
import {translate} from '@locales';
import {CloseIcon} from '@assets/icons/closeIcon';
import {LoginIcon} from '@assets/icons/loginIcon';

export const ModalSelectStudent = props => {
  const {isVisible, onCancel, onPressChild, childs, listChildRegister} = props;
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const renderItem = ({item, index}) => {
    return (
      <>
        {listChildRegister.includes(item.id) ? (
          <TouchableOpacity
            style={[styles.itemContainer, {backgroundColor: '#ccc'}]}
            disabled>
            <View style={styles.row}>
              <Avatar
                size="small"
                source={require('@assets/images/Student-male-avatar.png')}
                // style={styles.avatar}
              />
              <Text style={styles.nameItem}>
                {item.name} #{item.id}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: colors.text,
                fontStyle: 'italic',
                textAlign: 'right',
              }}>
              {translate('Registered')}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
              onPressChild(item);
            }}>
            <View style={styles.row}>
              <Avatar
                size="small"
                source={require('@assets/images/Student-male-avatar.png')}
                // style={styles.avatar}
              />
              <Text style={styles.nameItem}>
                {item.name} #{item.id}
              </Text>
            </View>
            {/* <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: colors.text,
                fontStyle: 'italic',
                textAlign: 'right',
              }}>
              {translate('Register')}
            </Text> */}
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <Modal
      visible={isVisible}
      backdropStyle={styles.backdrop}
      animationType="fade">
      <Layout style={styles.container}>
        <TouchableOpacity style={styles.closeBtn} onPress={onCancel}>
          <CloseIcon />
        </TouchableOpacity>
        <Text style={styles.header}>
          {translate('Select students to register')}
        </Text>
        <FlatList data={childs} renderItem={renderItem} />
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
      paddingHorizontal: wp(5),
      paddingVertical: 20,
      width: wp(80),
      backgroundColor: colors.BACKGROUND_MODAL,
      borderRadius: 16,
    },
    header: {
      fontSize: 21,
      fontWeight: '700',
      textAlign: 'center',
      color: colors.PRIMARY.text,
      marginTop: 5,
      marginBottom: 10,
    },
    text: {
      color: colors.text,
      textAlign: 'center',
    },
    closeBtn: {
      alignItems: 'flex-end',
    },
    loginTitle: {
      color: colors.text,
      fontWeight: '500',
      fontSize: 15,
      marginRight: 5,
    },
    nameItem: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 10,
    },
    idItem: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    itemContainer: {
      marginVertical: 3,
      backgroundColor: colors.SECONDARY[400],
      borderRadius: 15,
      marginVertical: 5,
      paddingHorizontal: 15,
      paddingVertical: 10,
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      //   marginVertical: 3,
      alignItems: 'center',
      //   backgroundColor: colors.SECONDARY[400],
      //   borderRadius: 15,
      //   marginVertical: 5,
      //   paddingHorizontal: 15,
      //   paddingVertical: 10,
    },
  });
