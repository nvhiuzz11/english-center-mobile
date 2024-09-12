import React from 'react';

import {useTheme} from '@react-navigation/native';
import {Layout, Modal} from '@ui-kitten/components';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {wp} from '@utils/responsive';
import {translate} from '@locales';
import {CloseIcon} from '@assets/icons/closeIcon';
import {LoginIcon} from '@assets/icons/loginIcon';

export const ModalRecommendLogin = props => {
  const {isVisible, onCancel, onLogin} = props;
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  return (
    <Modal
      visible={isVisible}
      backdropStyle={styles.backdrop}
      animationType="fade">
      <Layout style={styles.container}>
        <TouchableOpacity style={styles.closeBtn} onPress={onCancel}>
          <CloseIcon />
        </TouchableOpacity>
        <Text style={styles.header}>{translate('Notice')}</Text>
        <Text style={styles.text}>
          {translate('You are not logged in to your account')}!
        </Text>
        <Text style={styles.text}>
          {translate('Please log in to continue')}!
        </Text>
        <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
          <Text style={styles.loginTitle}>{translate('Login')}</Text>
          <LoginIcon />
        </TouchableOpacity>
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
    loginBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.PRIMARY.button,
      alignSelf: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 7,
      paddingVertical: 3,
      borderRadius: 5,
      marginTop: 15,
      borderWidth: 1,
      borderColor: colors.PRIMARY[900],
    },
  });
