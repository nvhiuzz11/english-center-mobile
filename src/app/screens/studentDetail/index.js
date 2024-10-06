import React, {useRef, useState} from 'react';
import {Container} from '@components/container';
import {useIsFocused, useNavigation, useTheme} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  FlatList,
  Button,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MainHeader} from '@components/mainHeader';
import {hp, wp} from '@utils/responsive';
import {Header} from '@components/header';
import {
  ROUTES_STUDENT_CLASS,
  ROUTES_STUDENT_CLASS_OF_PARENT,
  SCREEN_NAME,
} from '@constants/navigation';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {translate} from '@locales';
import {Swipeable} from 'react-native-gesture-handler';
import {SwipeableItem} from '@components/swipeableItem';
import {Avatar} from '@ui-kitten/components';
import {AddCircleIcon} from '@assets/icons/addCircleIcon';
import {REQUEST_TYPE} from '@constants/request';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {PersonInfo} from './components/personInfo';
import {ChildClass} from './components/childClass';
import {useAuxios} from '@src/app/hook';

export const StudentDetailScreen = props => {
  const {childInfo} = props.route.params.payload;

  const {colors} = useTheme();
  const navigation = useNavigation();
  const styles = makeStyle(colors);

  const {publicAxios, authAxios} = useAuxios();
  const isFocused = useIsFocused();

  const [index, setIndex] = React.useState(0);

  const renderTabBar = props => {
    return (
      <Animated.View style={[styles.tabbarAnim]}>
        <TabBar
          scrollEnabled
          {...props}
          style={styles.tabBar}
          tabStyle={styles.tabStyle}
          labelStyle={styles.tabBarLabel}
          pressColor={'transparent'}
          indicatorStyle={{backgroundColor: colors.NEUTRAL[900]}}
          activeColor={colors.NEUTRAL[900]}
          inactiveColor={colors.NEUTRAL[400]}
        />
      </Animated.View>
    );
  };

  const renderScene = ({route}) => {
    return (
      <>
        {route.key === 'first' ? (
          <PersonInfo childInfo={childInfo} />
        ) : (
          <ChildClass childInfo={childInfo} />
        )}
      </>
    );
  };

  return (
    <Container>
      <Header title={translate('Student Information')} />

      <View style={styles.container}>
        <TabView
          navigationState={{index, routes: ROUTES_STUDENT_CLASS_OF_PARENT}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
        />
      </View>
    </Container>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: 'center',
      // paddingHorizontal: wp(2),
    },
    tabbarAnim: {
      top: 0,
      zIndex: 1,
      width: '100%',
      //  position: 'absolute',
    },
    tabBar: {
      borderBottomWidth: 0.5,
      borderBottomColor: colors.NEUTRAL[900],
      backgroundColor: colors.NEUTRAL[700],
    },
    tabStyle: {
      width: wp(50),
    },
    tabBarLabel: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 16,
      color: colors.PRIMARY[500],
      fontWeight: 'bold',
      textTransform: 'none',
    },
  });
