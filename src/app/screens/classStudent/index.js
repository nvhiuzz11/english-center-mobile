import React, {useEffect, useRef, useState} from 'react';
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
import {CourseItem} from './components/courseItem';
import {Header} from '@components/header';
import {ROUTES_STUDENT_CLASS, SCREEN_NAME} from '@constants/navigation';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {translate} from '@locales';
import {DropDownIcon} from '@assets/icons/dropDownIcon';
import {ActiveClass} from './components/activeClass';
import {ClosedClass} from './components/closedClass';
import {useAuxios} from '@src/app/hook';
import {CLASS_STATUS} from '@constants/user';
import {StatusCodes} from 'http-status-codes';
import {Loading} from '@components/loading';

// const ClosedClass = () => <View style={{flex: 1}} />;

// const renderScene = SceneMap({
//   first: ActiveClass,
//   second: ClosedClass,
// });

export const ClassStudentScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const [index, setIndex] = React.useState(0);

  const {publicAxios, authAxios} = useAuxios();
  const isFocused = useIsFocused();

  const [comingClass, setComingClass] = useState([]);
  const [openingClass, setOpeningClass] = useState([]);
  const [closedClass, setClosedClass] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isFocused) {
      fetchClasses();
    }
  }, [isFocused]);

  const fetchClasses = async () => {
    try {
      const response = await authAxios.get('api/my-class');
      if (response.status === StatusCodes.OK) {
        console.log('fetchClasses res my class :', response.data);
        const classesData = response.data;
        setClasses(classesData);

        setComingClass(
          classesData.filter(item => item.status === CLASS_STATUS.COMMING),
        );
        setOpeningClass(
          classesData.filter(item => item.status === CLASS_STATUS.OPENING),
        );
        setClosedClass(
          classesData.filter(item => item.status === CLASS_STATUS.CLOSED),
        );
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('fetchClasses error', error);
    }
  };

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
          <ActiveClass comingClass={comingClass} openingClass={openingClass} />
        ) : (
          <ClosedClass closedClass={closedClass} />
        )}
      </>
    );
  };

  return (
    <Container>
      {isLoading && <Loading />}
      <MainHeader />
      <View style={styles.container}>
        <TabView
          navigationState={{index, routes: ROUTES_STUDENT_CLASS}}
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
    contentContainerStyle: {
      marginTop: 6,
      flexGrow: 1,
    },
    containerEmpty: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: hp(10),
    },
    topContent: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: 'normal',
      fontStyle: 'normal',
      textAlign: 'center',
      marginBottom: wp(6),
      color: colors.NEUTRAL[800],
    },
    containerSearch: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    buttonSearch: {
      borderRadius: 8,
      width: 40,
      height: 40,
      borderWidth: 1,
      borderColor: '#003452',
      position: 'absolute',
      bottom: wp(2),
      right: wp(5),
      backgroundColor: '#003452',
    },
    titleAllNFT: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 30,
      color: colors.NEUTRAL[900],
    },
    inputSearch: {
      flex: 1,
      marginRight: 10,
      borderRadius: 12,
    },
    searchView: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: wp(4),
    },
    hiddenContainer: {
      padding: 8,
      borderRadius: 4,
      marginBottom: 8,
    },
    hiddenWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
      paddingHorizontal: 8,
    },
    hiddenText: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: 'bold',
      color: colors.NEUTRAL[900],
    },
    containerItem: {
      width: wp(33) - 20,
      borderWidth: 0,
      justifyContent: 'center',
      backgroundColor: colors.NEUTRAL[50],
      margin: 8,
      borderRadius: 5,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    styleImage: {
      width: wp(33) - 20,
      height: wp(33) - 20,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textId: {
      textAlign: 'center',
      color: colors.NEUTRAL[800],
      marginHorizontal: 4,
      marginVertical: 2,
    },
  });
