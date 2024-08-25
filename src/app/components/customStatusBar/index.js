import * as React from 'react';
import {StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export const CustomStatusBar = props => {
  const isFocused = useIsFocused();
  const themeMode = useSelector(state => state.settings.themeMode);
  return isFocused ? (
    <StatusBar
      {...props}
      barStyle={themeMode === 'light' ? 'light-content' : 'dark-content'}
    />
  ) : null;
};
