import React, {Component} from 'react';
import {Text, TopNavigation, Divider, Avatar} from '@ui-kitten/components';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {wp} from '@utils/index';
import PropTypes from 'prop-types';
import {useNavigation, useTheme} from '@react-navigation/native';
import {TextStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {BackIcon} from '@assets/icons/backIcon';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {translate} from '@locales';
import {SCREEN_NAME} from '@constants/navigation';

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

  const isLogin = useSelector(state => state.app.isLogin);
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

  const renderAccessoryLeft = () => {
    return (
      <View style={isLogin && {backgroundColor: colors.MAIN_HEADER}}>
        <FastImage
          source={require('@assets/images/logo.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    );
  };

  const renderAccessoryRight = () => {
    return (
      <>
        {isLogin ? (
          <View>
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={() => {
                navigation.navigate(SCREEN_NAME.PERSONAL_INFORMATION);
              }}>
              <Avatar
                size="medium"
                source={require('@assets/images/Student-male-avatar.png')}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                navigation.navigate(SCREEN_NAME.LOGIN);
              }}>
              <Text style={styles.buttonTitle}>
                {translate('Login LOHUHI')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  };

  return (
    <React.Fragment>
      <TopNavigation
        style={[
          styles.container,
          !isLogin && {backgroundColor: colors.MAIN_HEADER},
        ]}
        accessoryLeft={renderAccessoryLeft}
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
      backgroundColor: colors.NEUTRAL[700],
      marginRight: 15,
    },
    avatar: {margin: 5},
    divider: {backgroundColor: colors.PRIMARY[300]},
    loginButton: {
      backgroundColor: colors.PRIMARY.button,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 100,
    },
    buttonTitle: {
      fontSize: 15,
      color: colors.PRIMARY.text,
      fontWeight: '600',
    },
    image: {
      width: 120,
      height: 50,
    },
    gradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
