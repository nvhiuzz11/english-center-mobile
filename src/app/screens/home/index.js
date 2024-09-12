import React, {useRef} from 'react';
import {Container} from '@components/container';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  FlatList,
  Button,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MainHeader} from '@components/mainHeader';
import {hp, wp} from '@utils/responsive';
import {CourseItem} from './components/courseItem';
import {Header} from '@components/header';
import {SCREEN_NAME} from '@constants/navigation';
import {setThemeMode} from '@store/reducers/setting';
import {InputApp} from '@components/input';
import {SearchIcon} from '@assets/icons/searchIcon';
import {FilterHomeIcon} from '@assets/icons/filterHomeIcon';
import {translate} from '@locales';
import {DrawerLayout} from 'react-native-gesture-handler';
import {ModalFilterClass} from './components/ModalFilterClass';

export const HomeScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const isLogin = useSelector(state => state.app.isLogin);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const refModalFilterClass = useRef(null);

  const listCourse = [
    {a: 1},
    {a: 2},
    {a: 3},
    {a: 4},
    {a: 5},
    {a: 6},
    {a: 7},
    {a: 8},
    {a: 9},
    {a: 10},
    {a: 11},
  ]; // Ví dụ danh sách có 11 phần tử

  const prepareGroups = React.useCallback((data, numItemsPerGroup) => {
    const groups = [];
    for (let i = 0; i < data.length; i += numItemsPerGroup) {
      groups.push(data.slice(i, i + numItemsPerGroup));
    }
    return groups;
  }, []);

  const numItemsPerGroup = 2;
  const groupedData = React.useMemo(
    () => prepareGroups(listCourse, numItemsPerGroup),
    [listCourse, prepareGroups],
  );
  const totalDots = Math.min(7, groupedData.length);

  const handleScroll = React.useCallback(event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const layoutWidth = event.nativeEvent.layoutMeasurement.width;

    const newIndex = Math.floor(contentOffsetX / layoutWidth);
    setCurrentIndex(newIndex);
  }, []);

  const renderDots = React.useMemo(() => {
    const dots = [];
    let start = Math.max(0, currentIndex - Math.floor(totalDots / 2));
    let end = start + totalDots;

    if (end > groupedData.length) {
      start = groupedData.length - totalDots;
      end = groupedData.length;
    }

    for (let i = start; i < end; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            i === currentIndex ? styles.activeDot : styles.inactiveDot,
          ]}
        />,
      );
    }

    return dots;
  }, [currentIndex, totalDots, groupedData.length, styles]);

  const renderItem = React.useCallback(
    ({item}) => <CourseItem courseData={item} onPressCource={onPressCource} />,
    [],
  );
  const renderGroup = React.useCallback(
    ({item}) => (
      <View style={{marginTop: 10, paddingHorizontal: wp(2), width: wp(96)}}>
        <FlatList
          data={item}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    ),
    [renderItem],
  );

  const renderAccessoryRightSearchInput = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          refModalFilterClass.current.open();
        }}>
        <FilterHomeIcon
          color={colors.PRIMARY[100]}
          bgColor={colors.PRIMARY[800]}
        />
      </TouchableOpacity>
    );
  };

  const onPressCource = courseData => {
    navigation.navigate(SCREEN_NAME.REGISTER_CLASS, {
      payload: {courseData: courseData},
    });
  };

  return (
    <Container>
      <MainHeader />

      <ScrollView style={styles.container}>
        <View style={styles.classContainer}>
          <Text style={styles.header}>
            {translate('Class list is about to open')}
          </Text>
          <View style={styles.columnContainer}>
            <InputApp
              style={styles.searchInput}
              textStyle={styles.searchText}
              placeholder={translate('Enter search key')}
              accessoryLeft={<SearchIcon color={colors.PRIMARY[900]} />}
              accessoryRight={renderAccessoryRightSearchInput}
            />

            <FlatList
              data={groupedData}
              renderItem={renderGroup}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              onScroll={handleScroll}
            />
          </View>

          <View style={styles.paginationContainer}>{renderDots}</View>
        </View>
      </ScrollView>
      <ModalFilterClass ref={refModalFilterClass} />
    </Container>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: wp(2),
    },
    classContainer: {
      marginTop: 30,
    },
    columnContainer: {
      backgroundColor: colors.NEUTRAL[50],
      marginTop: 20,
      paddingBottom: 10,
    },
    header: {
      fontSize: 22,
      color: colors.SECONDARY[800],
      fontWeight: '700',
      textAlign: 'center',
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: hp(2),
    },
    dot: {
      width: wp(2),
      height: wp(2),
      borderRadius: wp(1),
      marginHorizontal: wp(1),
    },
    activeDot: {
      backgroundColor: colors.NEUTRAL[100],
    },
    inactiveDot: {
      backgroundColor: colors.PRIMARY[500],
    },
    searchInput: {
      marginHorizontal: 10,
      borderRadius: 15,
      marginTop: 10,
      borderColor: colors.PRIMARY[500],
      backgroundColor: colors.PRIMARY[100],
    },
    searchText: {
      color: colors.text,
    },
  });
