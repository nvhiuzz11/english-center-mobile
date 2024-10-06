import React, {useState} from 'react';

import {useTheme} from '@react-navigation/native';
import {Avatar, Layout, Modal} from '@ui-kitten/components';
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {hp, wp} from '@utils/responsive';
import {translate} from '@locales';
import {CloseIcon} from '@assets/icons/closeIcon';
import {InputApp} from '@components/input';
import {isOnlyWhitespace} from '@utils/input';

export const ModalAddRequest = props => {
  const {isVisible, onClose, onCreat} = props;
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const [parentId, setParentId] = useState(null);
  const [error, setError] = useState(null);

  const onPress = () => {
    console.log('parentId', parentId);
    if (!parentId || isOnlyWhitespace(parentId) || isNaN(parentId)) {
      setError(translate('Enter the id as a number'));
    } else {
      setError(null);
      onCreat(parentId);
    }
  };

  return (
    <Modal
      visible={isVisible}
      backdropStyle={styles.backdrop}
      animationType="fade">
      <Layout style={styles.container}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <CloseIcon />
        </TouchableOpacity>
        <Text style={styles.header}>{translate('Add parent')}</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{translate('Enter the parent id')}:</Text>
          <InputApp
            style={styles.input}
            value={parentId}
            onChangeText={setParentId}
            size="small"
            caption={error && error}
            status={error ? 'danger' : 'basic'}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={onPress}>
          <Text style={styles.titleButton}>{translate('Add')}</Text>
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
    inputContainer: {
      marginBottom: 10,
    },
    title: {
      color: colors.text,
      fontWeight: '400',
      marginLeft: 5,
    },
    input: {
      borderRadius: 10,
    },
    label: {
      color: colors.text,
      fontWeight: '500',
      fontSize: 14,
      marginBottom: 5,
    },
    addButton: {
      backgroundColor: colors.SEMANTIC.SUCCESS[500],
      paddingVertical: 10,
      alignItems: 'center',
      marginVertical: 5,
      borderRadius: 15,
      marginVertical: wp(2),
      paddingHorizontal: wp(5),
    },
    titleButton: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
  });
