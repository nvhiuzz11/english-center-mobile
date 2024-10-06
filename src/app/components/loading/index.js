import {useTheme} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export const Loading = React.memo(props => {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const {size = 'large', color = colors.SECONDARY[500], style} = props;

  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.container}>
        <ActivityIndicator size={size} color={color} />
      </View>
    </View>
  );
});

const makeStyle = colors =>
  StyleSheet.create({
    wrapper: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 99999,
      alignItems: 'center',
      position: 'absolute',
      justifyContent: 'center',
      backgroundColor: '#00000085',
    },
    container: {
      padding: 40,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#494f61',
    },
  });
