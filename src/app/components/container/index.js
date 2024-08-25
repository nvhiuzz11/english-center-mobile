import {CustomStatusBar} from '@components/customStatusBar';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

export const Container = props => {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        ...props.style,
      }}>
      <CustomStatusBar backgroundColor={colors.BACKGROUND_PRIMARY} />
      {props.children}
    </SafeAreaView>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.BACKGROUND_PRIMARY,
    },
    styleContent: {
      flex: 1,
    },
  });
