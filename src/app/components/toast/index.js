import {ErrorToastIcon} from '@assets/icons/ErrorToastIcon';
import {InfoToastIcon} from '@assets/icons/InfoToastIcon';
import {SuccessToastIcon} from '@assets/icons/successToastIcon';
import {WarningToastIcon} from '@assets/icons/warningToastIcon';
import {useTheme} from '@react-navigation/native';
import {wp} from '@utils/responsive';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const TOAST_ICON_SIZE = 24;
const BaseToast = props => {
  const {
    backgroundColor,
    icon,
    title,
    subTitle,
    style,
    titleTextStyle,
    subTitleTextStyle,
  } = props;

  const {colors} = useTheme();
  const styles = makeStyle(colors);
  return (
    <View
      style={[styles.toast, backgroundColor ? {backgroundColor} : {}, style]}>
      <View style={styles.iconWrapper}>{icon}</View>
      <View style={styles.contentWrapper}>
        {title && <Text style={[styles.title, titleTextStyle]}>{title}</Text>}
        {subTitle && (
          <Text style={[styles.subTitle, subTitleTextStyle]}>{subTitle}</Text>
        )}
      </View>
    </View>
  );
};

export const SuccessToast = props => {
  return (
    <BaseToast
      icon={
        <SuccessToastIcon width={TOAST_ICON_SIZE} height={TOAST_ICON_SIZE} />
      }
      {...props}
    />
  );
};

export const ErrorToast = props => {
  return (
    <BaseToast
      icon={<ErrorToastIcon width={TOAST_ICON_SIZE} height={TOAST_ICON_SIZE} />}
      {...props}
    />
  );
};

export const WarningToast = props => {
  return (
    <BaseToast
      icon={
        <WarningToastIcon width={TOAST_ICON_SIZE} height={TOAST_ICON_SIZE} />
      }
      {...props}
    />
  );
};

export const InfoToast = props => {
  return (
    <BaseToast
      icon={<InfoToastIcon width={TOAST_ICON_SIZE} height={TOAST_ICON_SIZE} />}
      {...props}
    />
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    toast: {
      alignSelf: 'center',
      flexDirection: 'row',
      width: wp(100) - 32,
      borderRadius: 4,
      padding: 12,
      borderWidth: 1,
      borderColor: '#eaeaea',
      backgroundColor: '#eaeaea',
    },
    iconWrapper: {},
    contentWrapper: {
      marginLeft: 8,
      flex: 1,
    },
    title: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600',
      color: '#1c1c1c',
    },
    subTitle: {
      fontSize: 13,
      fontWeight: 'normal',
      fontStyle: 'normal',
      lineHeight: 16,
      color: '#3c3c3c',
    },
  });
