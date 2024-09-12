import {SCREEN_NAME, TAB_NAME} from '@constants/navigation';
import {hp, isAndroid, wp} from '@utils/index';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  UIManager,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import {Divider} from '@ui-kitten/components';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import {HomeTabIcon} from '@assets/icons/homeTabIcon';
import {translate} from '@locales';
import {ClassTabIcon} from '@assets/icons/classTabIcon';
import {ChildTabIcon} from '@assets/icons/childTabIcon';
import {ParentTabIcon} from '@assets/icons/parentTabIcon';
import {WageTabIcon} from '@assets/icons/wageTabIcon';
import {FeeTabIcon} from '@assets/icons/feeTabIcon';
import {SettingTabIcon} from '@assets/icons/settingTabIcon';

if (isAndroid && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

let spam = false;
export const BottomComponent = props => {
  const {insets, state: routerState, descriptors, navigation} = props;
  const {colors} = useTheme();

  const styles = makeStyles(colors);

  const onPressButton = React.useCallback(routerName => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    navigation.navigate(routerName);
  }, []);

  const renderButton = (route, isFocused) => {
    const descriptor = descriptors[route.key];
    return (
      <TouchableOpacity
        key={route.key}
        style={[styles.button]}
        onPress={() => onPressButton(descriptor.route.name)}
        onLayout={onLayout}>
        <>
          {renderIcon(descriptor, isFocused)}
          {renderTitle(descriptor.route.name, descriptor, isFocused)}
        </>
      </TouchableOpacity>
    );
  };

  const renderTitle = (name, descriptor, isFocused) => {
    const {options} = descriptor;
    const color = isFocused ? colors.SECONDARY[500] : colors.ICON_TAB_COLOR;
    switch (name) {
      case TAB_NAME.HOME_TAB:
        return (
          <Text style={{...styles.title, color: color}}>
            {translate('Home')}
          </Text>
        );
      case TAB_NAME.CLASS_STUDENT_TAB:
        return (
          <Text style={{...styles.title, color: color}}>
            {translate('Class')}
          </Text>
        );
      case TAB_NAME.CLASS_TEACHER_TAB:
        return (
          <Text style={{...styles.title, color: color}}>
            {translate('Class')}
          </Text>
        );
      case TAB_NAME.CHILD_TAB:
        return (
          <Text style={{...styles.title, color: color}}>
            {translate('Child')}
          </Text>
        );
      case TAB_NAME.PARENT_TAB:
        return (
          <Text style={{...styles.title, color: color}}>
            {translate('Parent')}
          </Text>
        );
      case TAB_NAME.WAGE_TAB:
        return (
          <Text style={{...styles.title, color: color}}>
            {translate('Wage')}
          </Text>
        );
      case TAB_NAME.FEE_TAB:
        return (
          <Text style={{...styles.title, color: color}}>
            {translate('Fee')}
          </Text>
        );
      case TAB_NAME.SETTING_TAB:
        return (
          <Text style={{...styles.title, color: color}}>
            {translate('Setting')}
          </Text>
        );
    }
  };

  const renderIcon = (descriptor, isFocused) => {
    const {name} = descriptor.route;
    const color = isFocused ? colors.SECONDARY[500] : colors.ICON_TAB_COLOR;
    switch (name) {
      case TAB_NAME.HOME_TAB:
        return <HomeTabIcon color={color} />;
      case TAB_NAME.CLASS_STUDENT_TAB:
        return <ClassTabIcon color={color} />;
      case TAB_NAME.CLASS_TEACHER_TAB:
        return <ClassTabIcon color={color} />;
      case TAB_NAME.CHILD_TAB:
        return <ChildTabIcon color={color} />;
      case TAB_NAME.PARENT_TAB:
        return <ParentTabIcon color={color} />;
      case TAB_NAME.WAGE_TAB:
        return <WageTabIcon color={color} />;
      case TAB_NAME.FEE_TAB:
        return <FeeTabIcon color={color} />;
      case TAB_NAME.SETTING_TAB:
        return <SettingTabIcon color={color} />;
    }
  };

  const onLayout = event => {
    if (spam) {
      return;
    }

    spam = true;
  };

  return (
    <View style={[styles.wapper]}>
      {/* {!isDarkMode && <Divider />} */}
      <View style={styles.container}>
        {routerState.routes.map((route, index) => {
          return renderButton(route, routerState.index === index);
        })}
      </View>
    </View>
  );
};

const makeStyles = colors =>
  StyleSheet.create({
    wapper: {
      height: isAndroid ? 56 : 82,
      backgroundColor: colors.BOTTOM_TAB,
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: wp(1),
      alignItems: 'center',
    },
    button: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
      paddingBottom: isAndroid ? 0 : 24,
    },
    title: {
      fontWeight: '600',
      fontSize: 12,
      lineHeight: 14.4,
      paddingTop: 2,
    },
  });
