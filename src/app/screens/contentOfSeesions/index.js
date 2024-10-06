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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MainHeader} from '@components/mainHeader';
import {hp, wp} from '@utils/responsive';
import {Header} from '@components/header';
import {ROUTES_CONTENT_OF_SEESION, SCREEN_NAME} from '@constants/navigation';
import {setThemeMode} from '@store/reducers/setting';
import {InputApp} from '@components/input';
import {SearchIcon} from '@assets/icons/searchIcon';
import {FilterHomeIcon} from '@assets/icons/filterHomeIcon';
import {translate} from '@locales';
import {DrawerLayout} from 'react-native-gesture-handler';
import {TabBar, TabView} from 'react-native-tab-view';
import {Attendance} from './components/attendance';
import {EvaluateSession} from './components/evaluateSession';
import {useAuxios} from '@src/app/hook';

export const ContentOfSessionsScreen = props => {
  const {classData} = props.route.params.payload;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const {publicAxios, authAxios} = useAuxios();
  const isFocused = useIsFocused();

  const [index, setIndex] = React.useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
          <Attendance classData={classData} />
        ) : (
          <EvaluateSession classData={classData}/>
        )}
      </>
    );
  };

  return (
    <Container>
      <Header title={translate('Content of sessions')} />
      <View style={styles.container}>
        <TabView
          navigationState={{index, routes: ROUTES_CONTENT_OF_SEESION}}
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
      paddingHorizontal: wp(2),
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
