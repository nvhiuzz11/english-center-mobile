import React, {Component} from 'react';
import {Text, TopNavigation, Divider, Avatar} from '@ui-kitten/components';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {wp} from '@utils/index';
import PropTypes from 'prop-types';
import {useNavigation, useTheme} from '@react-navigation/native';
import {TextStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {BackIcon} from '@assets/icons/backIcon';

interface HeaderProps {
  title: String;
  subtitle: String;
  titleIcon: String;
  isHideDivider: Boolean;
  titleTextStyle: TextStyleProp;
  backIconColor: String;
  hideDefaultAccessoryLeft: Boolean;
  accessoryLeft: Component;
  titleMore: String;
  titleMoreStyle: TextStyleProp;
  isLimitLineNumber: Boolean;
  accessoryRight: Component;
}

export const MainHeader = React.memo(props => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const styles = makeStyles(colors);

  const renderDefaultLeftAction = () => {
    const onPress = () => {
      navigation?.canGoBack() && navigation?.goBack();
    };

    // if (!navigation?.canGoBack()) {
    //   return null;
    // }

    // if (hideDefaultAccessoryLeft) {
    //   return null;
    // }
    return (
      <TouchableOpacity onPress={onPress} style={styles.backIconContainer}>
        <BackIcon color={colors.text} />
      </TouchableOpacity>
    );
  };

  const renderAccessoryRight = () => {
    return (
      <View>
        <TouchableOpacity style={styles.avatarContainer}>
          <Avatar
            size="medium"
            source={require('@assets/images/Student-male-avatar.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <React.Fragment>
      <TopNavigation
        style={[styles.container]}
        accessoryRight={renderAccessoryRight}
      />

      <Divider style={styles.divider} />
    </React.Fragment>
  );
});

const makeStyles = colors =>
  StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
    },
    avatarContainer: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 40,
      backgroundColor: '#d3d9e7',
      marginRight: 15,
    },
    avatar: {margin: 5},
    divider: {backgroundColor: colors.PRIMARY[100]},
  });
